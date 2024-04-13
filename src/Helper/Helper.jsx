export const waait = () =>
  new Promise((res) => setTimeout(res, Math.random() * 2000));

const generateRandomColor = () => {
  const existingBudgetLength = fetchData("budgets")?.length ?? 0;
  return `${existingBudgetLength * 34} 65% 50%`;
};

// Local storage
export const fetchData = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

//delete Item

export const DeleteItem = (key) => {
  return localStorage.removeItem(key);
};

//Create Budgets

export const CreateBudget = ({ name, amount }) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    amount: +amount,
    color: generateRandomColor(),
  };

  const existingBudget = fetchData("budgets") ?? [];
  return localStorage.setItem(
    "budgets",
    JSON.stringify([...existingBudget, newItem])
  );
};

//Create Expense

export const CreateExpense = ({ name, amount, BudgetId }) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    amount: +amount,
    BudgetId: BudgetId,
  };

  const existingExpense = fetchData("expense") ?? [];
  return localStorage.setItem(
    "expense",
    JSON.stringify([...existingExpense, newItem])
  );
};

// total spent by budget
export const calculateSpentByBudget = (budgetId) => {
  const expenses = fetchData("expense") ?? [];
  console.log(expenses);
  const budgetSpent = expenses.reduce((total, amt) => {
    // check if expense.id === budgetId I passed in
    if (amt.BudgetId !== budgetId) {
      console.log(total);
      return total;
    }
    // add the current amount to my total
    return (total += amt.amount);
  }, 0);
  return budgetSpent;
};

//Formate Currency

export const FormateCurrency = (amt) => {
  return amt.toLocaleString(undefined, {
    style: "currency",
    currency: "INR",
  });
};

// Formating percentages

export const formatPercentage = (amt) => {
  return amt.toLocaleString(undefined, {
    style: "percent",
    minimumFractionDigits: 0,
  });
};
