import React, { useEffect } from "react";
//helper
import {
  CreateExpense,
  deleteItem,
  getAllmatchingItem,
} from "../Helper/Helper";
//rrd
import { toast } from "react-toastify";
import { useLoaderData } from "react-router-dom";
//compponents
import BudgetItem from "../Components/BudgetItem";
import AddExpenseForm from "../Components/AddExpenseForm";
import Table from "../Components/Table";

//Loader

export const budgetLoader = async ({ params }) => {
  const budget = await getAllmatchingItem({
    category: "budgets",
    key: "id",
    value: params.id,
  })[0];

  const expense = await getAllmatchingItem({
    category: "expense",
    key: "BudgetId",
    value: params.id,
  });

  if (!budget) {
    throw new Error("The budget you're trying to find doesn't exist.");
  }

  return { budget, expense };
};

//Budget Action

export const budgetAction = async ({ request }) => {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  // create Expense
  if (_action === "createExpense") {
    try {
      CreateExpense({
        name: values.newExpense,
        amount: values.newExpenseAmount,
        BudgetId: values.newExpenseBudget,
      });
      return toast.success(`Expense ${values.newExpense} created !`);
    } catch (error) {
      throw new Error("There was a problem creating your new Expense");
    }
  }

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

const Budget = () => {
  const { budget, expense } = useLoaderData();

  let title = document.title;

  useEffect(() => {
    document.title = `${title} - ${budget.name}`;
  }, []);

  return (
    <>
      <div
        className="grid-lg"
        style={{
          "--accent": budget.color,
        }}
      >
        <h1 className="h2">
          <span className="accent">{budget.name} </span>
          Overview
        </h1>
        <div className="flex-lg">
          <BudgetItem budgets={budget} showDelete={true} />
          <AddExpenseForm budgets={[budget]} />
        </div>
        {expense && expense.length > 0 && (
          <div className="grid-md">
            <h2>
              <span className="accent">{budget.name} </span>
              Expense
            </h2>
            <Table expense={expense} showBudget={false} />
          </div>
        )}
      </div>
    </>
  );
};

export default Budget;
