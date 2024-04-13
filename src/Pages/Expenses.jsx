import React from "react";
import { fetchData } from "../Helper/Helper";
import { useLoaderData } from "react-router-dom";
import Table from "../Components/Table";

export const expensesLoader = () => {
  const expenses = fetchData("expense");
  return { expenses };
};

const Expenses = () => {
  const { expenses } = useLoaderData();
  //   console.log(expenses);
  return (
    <>
      <div className="grid-lg">
        <h1>All Expenses</h1>
        {expenses && expenses.length > 0 ? (
          <div className="grid-md">
            <h2>
              Recent Expenses <small>{expenses.length} total</small>
            </h2>
            <Table expense={expenses} />
          </div>
        ) : (
          <p>No expenses to show</p>
        )}
      </div>
    </>
  );
};

export default Expenses;
