import { redirect } from "react-router-dom";
import { DeleteItem } from "../Helper/Helper";
import { toast } from "react-toastify";

export const logoutActions = async () => {
  //delete the user
  DeleteItem("userName");

  //notify for delete user
  toast.success("You've deleted your account");

  //return redirect
  return redirect("/");
};
