// rrd imports
import { useLoaderData } from "react-router-dom";

//  helper functions
import { fetchData } from "../Helper/Helper";

// loader
export function dashboardLoader() {
  const userName = fetchData("userName");
  return { userName };
}

const Dashboard = () => {
  const { userName } = useLoaderData();

  return (
    <div>
      <h1>{userName} Dashboard</h1>
    </div>
  );
};
export default Dashboard;
