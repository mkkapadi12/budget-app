// Local storage
export const fetchData = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

//delete Item

export const DeleteItem = (key) => {
  return localStorage.removeItem(key);
};
