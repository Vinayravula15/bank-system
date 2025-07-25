const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Payment", {
    payment_id: { type: DataTypes.STRING, primaryKey: true, defaultValue: uuidv4 },
    loan_id: DataTypes.STRING,
    amount: DataTypes.FLOAT,
    payment_type: DataTypes.STRING,
  });
};
