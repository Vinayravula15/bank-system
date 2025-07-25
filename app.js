const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./config/db");
const loanRoutes = require("./routes/loans");
const customerRoutes = require("./routes/customers");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/v1/loans", loanRoutes);
app.use("/api/v1/customers", customerRoutes);

const { Customer, Loan, Payment } = require("./models/initModels");
db.sync({ force: false }).then(() => {
  console.log("Database synced.");
  app.listen(3000, () => console.log("Server running on http://localhost:3000"));
});