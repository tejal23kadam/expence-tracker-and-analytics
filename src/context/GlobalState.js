import React, { createContext, useReducer, useEffect } from "react";
import AppReducer from "./AppReducer";

// Updated category list to match your sample data
export const categories = [
  "Food",
  "Shopping",
  "Bills",
  "Income",
  "Transport",
  "Entertainment",
  "Other"
];

export const GlobalContext = createContext();

const defaultTransactions = [
  {
    id: 1763550121001,
    title: "Tea",
    text: "Tea",
    amount: -15,
    category: "Food",
    type: "expense",
    date: "2025-10-03"
  },
  {
    id: 1763550121002,
    title: "Salary",
    text: "Salary",
    amount: 45000,
    category: "Income",
    type: "income",
    date: "2025-10-01"
  },
  {
    id: 1763550121003,
    title: "Groceries",
    text: "Groceries",
    amount: -780,
    category: "Food",
    type: "expense",
    date: "2025-11-04"
  },
  {
    id: 1763550121004,
    title: "Petrol",
    text: "Petrol",
    amount: -1200,
    category: "Transport",
    type: "expense",
    date: "2025-11-05"
  },
  {
    id: 1763550121005,
    title: "Electricity Bill",
    text: "Electricity Bill",
    amount: -950,
    category: "Bills",
    type: "expense",
    date: "2025-09-06"
  },
  {
    id: 1763550121006,
    title: "Movie Night",
    text: "Movie Night",
    amount: -350,
    category: "Entertainment",
    type: "expense",
    date: "2025-10-07"
  },
  {
    id: 1763550121007,
    title: "Freelance Project",
    text: "Freelance Project",
    amount: 7000,
    category: "Income",
    type: "income",
    date: "2025-11-08"
  },
  {
    id: 1763550121008,
    title: "Bus Ticket",
    text: "Bus Ticket",
    amount: -30,
    category: "Transport",
    type: "expense",
    date: "2025-09-09"
  },
  {
    id: 1763550121009,
    title: "Milk",
    text: "Milk",
    amount: -60,
    category: "Food",
    type: "expense",
    date: "2025-08-10"
  },
  {
    id: 1763550121010,
    title: "Shopping",
    text: "Shopping",
    amount: -2200,
    category: "Shopping",
    type: "expense",
    date: "2025-11-11"
  },
  {
    id: 1763550121011,
    title: "Bonus",
    text: "Bonus",
    amount: 8000,
    category: "Income",
    type: "income",
    date: "2025-11-12"
  },
  {
    id: 1763550121012,
    title: "Water Bill",
    text: "Water Bill",
    amount: -300,
    category: "Bills",
    type: "expense",
    date: "2025-10-13"
  }
];

// Initial state

const saved = JSON.parse(localStorage.getItem("transactions"));

const initialState = {
  transactions: saved && saved.length > 0 ? saved : defaultTransactions,

  filter: {
    title: "",
    type: "", // "income" or "expense"
    category: "",
    dateFrom: "",
    dateTo: ""
  }
};

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(state.transactions));
  }, [state.transactions]);

  // Actions
  const addTransaction = (transaction) =>
    dispatch({ type: "ADD_TRANSACTION", payload: transaction });

  const deleteTransaction = (id) =>
    dispatch({ type: "DELETE_TRANSACTION", payload: id });

  const updateTransaction = (id, data) =>
    dispatch({ type: "UPDATE_TRANSACTION", payload: { id, data } });

  const setFilter = (filter) =>
    dispatch({ type: "SET_FILTER", payload: filter });

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        filter: state.filter,
        addTransaction,
        deleteTransaction,
        updateTransaction,
        setFilter,
        categories
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
