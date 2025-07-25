const { Loan, Payment } = require("../models/initModels");

exports.getCustomerOverview = async (req, res) => {
  try {
    const { customer_id } = req.params;
    const loans = await Loan.findAll({ where: { customer_id } });
    if (!loans.length) return res.status(404).json({ error: "No loans found for this customer" });

    const loanDetails = await Promise.all(
      loans.map(async (loan) => {
        const payments = await Payment.findAll({ where: { loan_id: loan.loan_id } });
        const amountPaid = payments.reduce((sum, p) => sum + p.amount, 0);
        const emisLeft = Math.ceil((loan.total_amount - amountPaid) / loan.monthly_emi);

        return {
          loan_id: loan.loan_id,
          principal: loan.principal_amount,
          total_amount: loan.total_amount,
          total_interest: loan.total_amount - loan.principal_amount,
          emi_amount: loan.monthly_emi,
          amount_paid: amountPaid,
          emis_left: emisLeft,
        };
      })
    );

    res.json({ customer_id, total_loans: loans.length, loans: loanDetails });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};