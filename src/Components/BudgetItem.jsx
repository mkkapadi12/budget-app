import React from "react";
import { FormateCurrency, formatPercentage } from "../Helper/Helper";
import { calculateSpentByBudget } from "../Helper/Helper";
import { Form, Link } from "react-router-dom";
import { BanknotesIcon, TrashIcon } from "@heroicons/react/24/solid";

const BudgetItem = ({ budgets, showDelete = false }) => {
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
      {showDelete ? (
        <Form
          method="post"
          action="delete"
          onSubmit={(event) => {
            if (
              !confirm(
                "Are you sure you want to permanently delete this Budget"
              )
            ) {
              event.preventDefault();
            }
          }}
        >
          <button type="submit" className="btn">
            <span>Delete Budget</span>
            <TrashIcon width={20} />
          </button>
        </Form>
      ) : (
        <div className="flex-sm">
          <Link to={`/budget/${id}`} className="btn">
            <span>View Details</span>
            <BanknotesIcon width={20} />
          </Link>
        </div>
      )}
    </div>
  );
};

export default BudgetItem;
