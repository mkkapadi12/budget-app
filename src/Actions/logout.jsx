import { redirect } from "react-router-dom";
import { deleteItem } from "../Helper/Helper";
import { toast } from "react-toastify";

export const logoutActions = async () => {
  //delete the user
  deleteItem({
    key: "userName",
  });
  deleteItem({
    key: "budgets",
  });
  deleteItem({
    key: "expense",
  });

  //notify for delete user
  toast.success("You've deleted your account");

  //return redirect
  return redirect("/");
};
