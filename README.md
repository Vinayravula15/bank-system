# 💰 Bank Lending System Backend

This is a simple RESTful API for a banking system where customers can take loans, repay through EMI or lump sum, and check their loan ledger and account overview. Built using **Node.js**, **Express**, and **SQLite (via Sequelize)**.

---

## 📦 Features

- **Lend**: Issue loans to customers with custom amount, duration, and interest rate.
- **Payment**: Accept EMI or lump sum payments for active loans.
- **Ledger**: View transaction history and balance of a specific loan.
- **Account Overview**: List all loans of a customer with payment status.

---

## 🛠️ Tech Stack

- **Backend**: Node.js + Express
- **Database**: SQLite (with Sequelize ORM)
- **UUID**: For unique IDs
- **CORS & Body-Parser**: Middleware for API handling

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Vinayravula15/bank-system.git
cd bank-system

2. Install dependencies
bash
npm install
3. Run the server
bash
node app.js
Server will start at: http://localhost:3000

bank-system/
├── app.js                  # App entry point
├── config/
│   └── db.js               # Sequelize DB config (SQLite)
├── models/                 # Sequelize models
│   ├── Customer.js
│   ├── Loan.js
│   ├── Payment.js
│   └── initModels.js
├── routes/                 # Express route handlers
│   ├── loans.js
│   └── customers.js
├── controllers/            # Controller logic for each route
│   ├── loanController.js
│   └── customerController.js
├── utils/
│   └── calculations.js     # Interest and EMI calculations
└── README.md               # Project documentation



