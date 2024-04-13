import React from "react";
import { FormateCurrency, formatPercentage } from "../Helper/Helper";
import { calculateSpentByBudget } from "../Helper/Helper";

const BudgetItem = ({ budgets }) => {
  //   console.log(budgets[0].name);
  const { name, id, amount, color } = budgets;
  const spent = calculateSpentByBudget(id);
  return (
    <div
      className="budget"
      style={{
        "--accent": color,
      }}
    >
      <div className="progress-text">
        <h3>{name}</h3>
        <p> {FormateCurrency(amount)} Budgeted</p>
      </div>
      <progress max={amount} value={spent}>
        {formatPercentage(spent / amount)}
      </progress>
      <div className="progress-text">
        <small>{FormateCurrency(spent)} spent</small>
        <small> {FormateCurrency(amount - spent)} remaining</small>
      </div>
    </div>
  );
};

export default BudgetItem;
