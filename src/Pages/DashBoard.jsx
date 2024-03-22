// rrd imports
import { useLoaderData } from "react-router-dom";

//  helper functions
import { CreateBudget, fetchData } from "../Helper/Helper";

//components
import Intro from "../Components/Intro";
import { toast } from "react-toastify";
import AddBudgetForm from "../Components/AddBudgetForm";

//action
export const DashboardAction = async ({ request }) => {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);
  console.log("_action :", _action);

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
};

// loader
export function dashboardLoader() {
  const userName = fetchData("userName");
  const budgets = fetchData("budgets");
  return { userName, budgets };
}

const Dashboard = () => {
  const { userName } = useLoaderData();

  return (
    <>
      {userName ? (
        <div className="dashboard">
          <h1>
            Welcome back , <span className="accent">{userName}</span>
          </h1>
          <div className="grid-am">
            {/* {
            budgets ? () : ()
          } */}
            <div className="grid-lg">
              <div className="flex-lg">
                <AddBudgetForm />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Intro />
      )}
    </>
  );
};
export default Dashboard;
