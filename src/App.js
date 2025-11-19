
import { GlobalProvider } from "./context/GlobalState";
import SummaryCard from "./components/SummaryCard";
import Filters from "./components/Filters";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import ChartPanel from "./components/ChartPanel";

import "./App.css";

function AppInner() {
  return (
    <div className="container pt-5 border border-dark">
      <h1 className="text-center">Expense Tracker</h1>
      <div className="dashboard">
        <div className="left-col">
          <TransactionForm />
        </div>

        <div className="right-col">
          <Filters />
        </div>
      </div>
      <div className="top-grid">
        <TransactionList />
      </div>

      <div className="top-grid">
        <SummaryCard />
      </div>
      <div className="main-grid">
        <div className="right-col">
          <ChartPanel />
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <GlobalProvider>
      <AppInner />
    </GlobalProvider>
  );
}
