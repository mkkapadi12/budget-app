// rrd imports
import { Link, useLoaderData } from "react-router-dom";

//  helper functions
import {
  CreateBudget,
  CreateExpense,
  deleteItem,
  fetchData,
  waait,
} from "../Helper/Helper";

//components
import Intro from "../Components/Intro";
import { toast } from "react-toastify";
import AddBudgetForm from "../Components/AddBudgetForm";
import AddExpenseForm from "../Components/AddExpenseForm";
import BudgetItem from "../Components/BudgetItem";
import Table from "../Components/Table";

// loader
export function dashboardLoader() {
  const userName = fetchData("userName");
  const budgets = fetchData("budgets");
  const expense = fetchData("expense");
  return { userName, budgets, expense };
}

//action
export const DashboardAction = async ({ request }) => {
  await waait();

  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);
  // console.log("_action :", _action);

  //new user submission
  if (_action === "newUser") {
    try {
      // throw new Error("Ya done");
      localStorage.setItem("userName", JSON.stringify(values.userName));
      return toast.success(`Welcome! ${values.userName}`);
    } catch (error) {
      throw new Error("There was a problem creating your account");
    }
  }

  // create Budget;
  if (_action === "createBudget") {
    try {
      CreateBudget({
        name: values.newBudget,
        amount: values.newBudgetAmount,
      });
      return toast.success("Budget Createing");
    } catch (error) {
      throw new Error("There was a problem creating your Budget");
    }
  }

  // create an Expense
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

const Dashboard = () => {
  const { userName, budgets, expense } = useLoaderData();

  return (
    <>
      {userName ? (
        <div className="dashboard">
          <h1>
            Welcome back , <span className="accent">{userName}</span>
          </h1>
          <div className="grid-sm">
            {budgets && budgets.length > 0 ? (
              <div className="grid-lg">
                <div className="flex-lg">
                  <AddBudgetForm />
                  <AddExpenseForm budgets={budgets} />
                  <h2>Existing Budgets</h2>
                  <div className="budgets">
                    {budgets.map((budget) => {
                      return <BudgetItem key={budget.id} budgets={budget} />;
                    })}
                  </div>
                  {expense && expense.length > 0 ? (
                    <div className="grid-md">
                      <h2>Recent Expenses</h2>
                      <Table
                        expense={expense
                          .sort((a, b) => b.createdAt - a.createdAt)
                          .slice(0, 5)}
                      />
                      {expense.length > 5 && (
                        <Link to="expenses" className="btn btn--dark">
                          View All Expenses
                        </Link>
                      )}
                    </div>
                  ) : (
                    <div className="name"></div>
                  )}
                </div>
              </div>
            ) : (
              <div className="grid-sm">
                <p>Personal Budgeting is the secret to finacial freedom.</p>
                <p>Create a budget to get started !</p>
                <AddBudgetForm />
              </div>
            )}
          </div>
        </div>
      ) : (
        <Intro />
      )}
    </>
  );
};
export default Dashboard;
