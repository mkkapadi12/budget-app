import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Layouts
import Main, { MainLoader } from "./Layouts/Main";

// Actions
// import { logoutAction } from "./actions/logout";

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
      // {
      //   path : "about",
      //   element : <About/>
      // }
    ],
  },
  {
    path: "*",
    element: <Error />,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
