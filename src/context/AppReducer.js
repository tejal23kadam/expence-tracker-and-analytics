const AppReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TRANSACTION":
        console.log("add tra "+ action.payload.text);
      return {
        ...state,
        transactions: [
          {
            ...action.payload,
            id: Date.now(),
            text: action.payload.text ?? "No Title"
          },
          ...state.transactions
        ]
      };

    case "DELETE_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.filter(t => t.id !== action.payload)
      };

    case "UPDATE_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.map(t =>
          t.id === action.payload.id
            ? { ...t, ...action.payload.data, text: action.payload.data.title ?? t.title ?? "No Title" }
            : t
        )
      };

    case "SET_FILTER":
      return {
        ...state,
        filter: { ...state.filter, ...action.payload }
      };

    default:
      return state;
  }
};

export default AppReducer;
