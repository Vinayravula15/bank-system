const { DataTypes } = require("sequelize");
const db = require("../config/db");

const Customer = db.define("Customer", {
  customer_id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  name: DataTypes.STRING,
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = Customer;