function calculateLoan(principal, years, rate) {
  const interest = principal * years * (rate / 100);
  const total = principal + interest;
  const monthlyEmi = total / (years * 12);
  return { interest, total, monthlyEmi };
}

function recalculateEmis(balance, monthlyEmi) {
  return Math.ceil(balance / monthlyEmi);
}

module.exports = { calculateLoan, recalculateEmis };
