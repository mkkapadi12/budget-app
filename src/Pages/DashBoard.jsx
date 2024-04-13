// rrd imports
import { useLoaderData } from "react-router-dom";

//  helper functions
import {
  CreateBudget,
  CreateExpense,
  fetchData,
  waait,
} from "../Helper/Helper";

//components
import Intro from "../Components/Intro";
import { toast } from "react-toastify";
import AddBudgetForm from "../Components/AddBudgetForm";
import AddExpenseForm from "../Components/AddExpenseForm";

// loader
export function dashboardLoader() {
  const userName = fetchData("userName");
  const budgets = fetchData("budgets");
  return { userName, budgets };
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

  if (_action === "createBudget") {
    try {
      // create Budget;
      CreateBudget({
        name: values.newBudget,
        amount: values.newBudgetAmount,
      });
      return toast.success("Budget Createing");
    } catch (error) {
      throw new Error("There was a problem creating your Budget");
    }
  }

  if (_action === "createExpense") {
    try {
      // create an Expense

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
};

const Dashboard = () => {
  const { userName, budgets } = useLoaderData();

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
