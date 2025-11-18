import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";


export default function SummaryCard() {
    const { transactions } = useContext(GlobalContext);


    const income = transactions
        .filter(t => t.amount > 0)
        .reduce((a, b) => a + b.amount, 0);


    const expense = transactions
        .filter(t => t.amount < 0)
        .reduce((a, b) => a + Math.abs(b.amount), 0);


    const balance = income - expense;


   return (
    <div className="summary-card">
      <div className="card balance-card">
        <h4>Total Balance</h4>
        <p>{balance}</p>
      </div>

      <div className="card balance-card">
        <h4>Income</h4>
        <p>{income}</p>
      </div>

      <div className="card balance-card">
        <h4>Expense</h4>
        <p>{expense}</p>
      </div>
    </div>
  );
}