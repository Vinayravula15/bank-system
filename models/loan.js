const { DataTypes } = require("sequelize");
const db = require("../config/db");
const { v4: uuidv4 } = require("uuid");

const Loan = db.define("Loan", {
  loan_id: {
    type: DataTypes.STRING,
    primaryKey: true,
    defaultValue: uuidv4,
  },
  customer_id: DataTypes.STRING,
  principal_amount: DataTypes.FLOAT,
  total_amount: DataTypes.FLOAT,
  interest_rate: DataTypes.FLOAT,
  loan_period_years: DataTypes.INTEGER,
  monthly_emi: DataTypes.FLOAT,
  status: DataTypes.STRING,
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = Loan;