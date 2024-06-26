// rrd imports
import { Outlet, useLoaderData } from "react-router-dom";
//  helper functions
import { fetchData } from "../Helper/Helper";
//svg
import wave from "../assets/wave.svg";
//Components
import Nav from "../Components/Nav";
// loader

export const MainLoader = () => {
  const userName = fetchData("userName");
  return { userName };
};

const Main = () => {
  const { userName } = useLoaderData();

  return (
    <div className="layout">
      <Nav userName={userName} />
      <main>
        <Outlet />
      </main>
      <img src={wave} alt="wave" />
    </div>
  );
};
export default Main;
