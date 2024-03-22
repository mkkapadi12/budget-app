// rrd imports
import { useLoaderData } from "react-router-dom";

//  helper functions
import { fetchData } from "../Helper/Helper";

//components
import Intro from "../Components/Intro";
import { toast } from "react-toastify";

//action
export const DashboardAction = async ({ request }) => {
  const data = await request.formData();
  const FormData = Object.fromEntries(data);
  try {
    localStorage.setItem("userName", JSON.stringify(FormData.userName));
    return toast.success(`Welcome! ${FormData.userName}`);
  } catch (error) {
    throw new Error("There was a problem creating your account");
  }
};

// loader
export function dashboardLoader() {
  const userName = fetchData("userName");
  return { userName };
}

const Dashboard = () => {
  const { userName } = useLoaderData();

  return <>{userName ? <p>{userName}</p> : <Intro />}</>;
};
export default Dashboard;
