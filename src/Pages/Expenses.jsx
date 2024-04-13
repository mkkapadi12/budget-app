import React from "react";
import { toast } from "react-toastify";
import { deleteItem, fetchData } from "../Helper/Helper";
import { useLoaderData } from "react-router-dom";
import Table from "../Components/Table";

export const expensesLoader = async () => {
  const expenses = fetchData("expense");
  return { expenses };
};

//action

export const expenseAction = async ({ request }) => {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  // delete an Expense
  if (_action === "deleteExpense") {
    try {
      deleteItem({
        key: "expense",
        id: values.expenseId,
      });
      return toast.success(`Expense deleted !`);
    } catch (error) {
      throw new Error("There was a problem deleting your Expense");
    }
  }
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
