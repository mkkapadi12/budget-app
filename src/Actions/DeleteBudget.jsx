import { deleteItem, getAllmatchingItem } from "../Helper/Helper";
import { toast } from "react-toastify";
import { redirect } from "react-router-dom";

const deleteBudget = ({ params }) => {
  try {
    deleteItem({
      key: "budgets",
      id: params.id,
    });

    const associatedExpenses = getAllmatchingItem({
      category: "expense",
      key: "BudgetId",
      value: params.id,
    });

    console.log(associatedExpenses);

    associatedExpenses.forEach((expense) => {
      deleteItem({
        key: "expense",
        id: expense.id,
      });
    });

    toast.success("Budget deleted Successfully");
  } catch (e) {
    throw new Error("There was a problem to deleting your Budget.");
  }
  return redirect("/");
};

export default deleteBudget;
