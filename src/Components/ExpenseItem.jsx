import React from "react";
import { TrashIcon } from "@heroicons/react/24/solid";
import {
  FormateCurrency,
  formateDate,
  getAllmatchingItem,
} from "../Helper/Helper";
import { Link, useFetcher } from "react-router-dom";

const ExpenseItem = ({ expense }) => {
  const fetcher = useFetcher();

  const budget = getAllmatchingItem({
    category: "budgets",
    key: "id",
    value: expense.BudgetId,
  })[0];

  // console.log(budget);

  return (
    <>
      <td>{expense.name}</td>
      <td>{FormateCurrency(expense.amount)}</td>
      <td>{formateDate(expense.createdAt)}</td>
      <td>
        <Link
          to={`/budget/${budget.id}`}
          style={{
            "--accent": budget.color,
          }}
        >
          {budget.name}
        </Link>
      </td>
      <td>
        <fetcher.Form method="post">
          <input type="hidden" name="_action" value="deleteExpense" />
          <input type="hidden" name="expenseId" value={expense.id} />
          <button
            type="submit"
            className="btn btn--warning"
            aria-label={`Delete ${expense.name} expense`}
          >
            <TrashIcon width={20}></TrashIcon>
          </button>
        </fetcher.Form>
      </td>
    </>
  );
};

export default ExpenseItem;
