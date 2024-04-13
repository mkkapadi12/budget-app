export const waait = () =>
  new Promise((res) => setTimeout(res, Math.random() * 800));

const generateRandomColor = () => {
  const existingBudgetLength = fetchData("budgets")?.length ?? 0;
  return `${existingBudgetLength * 34} 65% 50%`;
};

// Local storage
export const fetchData = (key) => {
  return JSON.parse(localStorage.getItem(key));
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

//Delete an item from local storage

export const deleteItem = ({ key, id }) => {
  const existingData = fetchData("expense");
  // console.log(existingData);
  if (id) {
    const newData = existingData.filter((item) => item.id !== id);
    // console.log(newData);
    return localStorage.setItem(key, JSON.stringify(newData));
  }
  return localStorage.removeItem(key);
};

// total spent by budget
export const calculateSpentByBudget = (budgetId) => {
  const expenses = fetchData("expense") ?? [];
  // console.log(expenses);
  const budgetSpent = expenses.reduce((total, amt) => {
    // check if expense.id === budgetId I passed in
    if (amt.BudgetId !== budgetId) {
      // console.log(total);
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

//formate Date

export const formateDate = (epoch) => {
  return new Date(epoch).toLocaleDateString();
};

//get All item from local storage

export const getAllmatchingItem = ({ category, key, value }) => {
  const data = fetchData(category) ?? [];
  // console.log(data);
  return data.filter((item) => item[key] === value);
};
