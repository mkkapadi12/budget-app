//rrd library
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Layouts
import Main, { MainLoader } from "./Layouts/Main";

//recat tostify Library
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Actions
import { logoutActions } from "./Actions/logout";
import deleteBudget from "./Actions/DeleteBudget";

// Routes
import Dashboard, { DashboardAction, dashboardLoader } from "./Pages/DashBoard";
import Error from "./Pages/Error";
import Expenses, { expenseAction, expensesLoader } from "./Pages/Expenses";
import Budget, { budgetAction, budgetLoader } from "./Pages/Budget";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    loader: MainLoader,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Dashboard />,
        errorElement: <Error />,
        action: DashboardAction,
        loader: dashboardLoader,
      },
      {
        path: "budget/:id",
        element: <Budget />,
        loader: budgetLoader,
        action: budgetAction,
        errorElement: <Error />,
        children: [
          {
            path: "delete",
            action: deleteBudget,
          },
        ],
      },
      {
        path: "expenses",
        element: <Expenses />,
        loader: expensesLoader,
        action: expenseAction,
      },

      {
        path: "logout",
        action: logoutActions,
      },
    ],
  },
  // {
  //   path: "*",
  //   element: <Error />,
  // },
]);

const App = () => {
  return (
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
};

export default App;
