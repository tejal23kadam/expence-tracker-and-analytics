import React, { createContext, useReducer, useEffect } from "react";
import AppReducer from "./AppReducer";

export const categories = ["Food", "Shopping", "Bills", "Salary", "Travel", "Other"];

export const GlobalContext = createContext();

// Initial state
const initialState = {
  transactions: JSON.parse(localStorage.getItem("transactions")) || [],
  filter: {
    title: "",
    type: "", // "income" or "expense"
    category: "",
    dateFrom: "",
    dateTo: ""
  }
};

// Provider
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
