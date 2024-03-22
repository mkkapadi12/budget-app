//rrd library
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Layouts
import Main, { MainLoader } from "./Layouts/Main";

//recat tostify Library
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Actions
import { logoutActions } from "./Actions/logout";

// Routes
import Dashboard, { dashboardLoader } from "./Pages/DashBoard";
import Error from "./Pages/Error";

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
        loader: dashboardLoader,
      },
      {
        path: "logout",
        action: logoutActions,
      },
    ],
  },
  {
    path: "*",
    element: <Error />,
  },
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
