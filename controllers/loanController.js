const { Loan, Payment } = require("../models/initModels");
const { calculateLoan, recalculateEMIs } = require("../utils/calculations");

exports.createLoan = async (req, res) => {
  try {
    const { customer_id, loan_amount, loan_period_years, interest_rate_yearly } = req.body;
    if (!customer_id || !loan_amount || !loan_period_years || !interest_rate_yearly) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const { totalAmount, monthlyEMI } = calculateLoan(loan_amount, loan_period_years, interest_rate_yearly);
    const loan = await Loan.create({
      customer_id,
      principal_amount: loan_amount,
      total_amount: totalAmount,
      interest_rate: interest_rate_yearly,
      loan_period_years,
      monthly_emi: monthlyEMI,
      status: "ACTIVE",
    });
    res.status(201).json({ loan_id: loan.loan_id, customer_id, total_amount_payable: totalAmount, monthly_emi: monthlyEMI });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.makePayment = async (req, res) => {
  try {
    const { loan_id } = req.params;
    const { amount, payment_type } = req.body;
    const loan = await Loan.findByPk(loan_id);
    if (!loan) return res.status(404).json({ error: "Loan not found" });

    await Payment.create({ loan_id, amount, payment_type });
    loan.total_amount -= amount;

    const emisLeft = recalculateEMIs(loan.total_amount, loan.monthly_emi);
    if (loan.total_amount <= 0) loan.status = "PAID_OFF";

    await loan.save();

    res.json({ payment_id: Date.now(), loan_id, message: "Payment recorded successfully.", remaining_balance: loan.total_amount, emis_left: emisLeft });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getLedger = async (req, res) => {
  try {
    const { loan_id } = req.params;
    const loan = await Loan.findByPk(loan_id);
    if (!loan) return res.status(404).json({ error: "Loan not found" });
    const transactions = await Payment.findAll({ where: { loan_id }, order: [["payment_date", "ASC"]] });

    const amountPaid = transactions.reduce((sum, tx) => sum + tx.amount, 0);
    const balance = loan.total_amount;
    const emisLeft = recalculateEMIs(balance, loan.monthly_emi);

    res.json({
      loan_id,
      customer_id: loan.customer_id,
      principal: loan.principal_amount,
      total_amount: loan.total_amount,
      monthly_emi: loan.monthly_emi,
      amount_paid: amountPaid,
      balance_amount: balance,
      emis_left: emisLeft,
      transactions,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
