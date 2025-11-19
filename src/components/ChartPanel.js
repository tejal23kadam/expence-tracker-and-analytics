import React, { useContext, useMemo } from "react";
import { GlobalContext } from "../context/GlobalState";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip as PieTooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as BarTooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

export default function ChartPanel() {
  const { transactions } = useContext(GlobalContext);

  //Pie Chart: Expense by Category 
  const categoryTotals = useMemo(() => {
    const map = {};
    transactions.forEach((t) => {
      if (t.amount < 0) { // only expenses
        const key = t.category || "Other";
        map[key] = (map[key] || 0) + Math.abs(t.amount);
      }
    });
    return Object.keys(map).map((cat) => ({
      name: cat,
      value: map[cat],
    }));
  }, [transactions]);

  const COLORS = ["#0088FE", "#FF8042", "#00C49F", "#FFBB28", "#AA336A", "#8844FF"];

  // Bar Chart: Monthly Income vs Expense 
  const monthlyData = useMemo(() => {
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const data = months.map((m) => ({
      month: m,
      income: 0,
      expense: 0
    }));

    transactions.forEach((t) => {
      if (!t.date) return;
      const monthIndex = new Date(t.date).getMonth();
      if (t.amount >= 0) {
        data[monthIndex].income += t.amount;
      } else {
        data[monthIndex].expense += Math.abs(t.amount);
      }
    });

    return data;
  }, [transactions]);

  return (
    <div className="chart-panel">

      {/* Pie Chart */}
      <div className="chart-card">
        <h3>Expense by Category</h3>
        
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>

          {/* Pie Chart */}
          <div style={{ width: "60%", height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryTotals}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label
                >
                  {categoryTotals.map((entry, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>

                {/* Remove default Legend (we use custom) */}
                <PieTooltip formatter={(value) => `₹${value}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>

        
          <div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {categoryTotals.map((entry, i) => (
                <li key={i} style={{ display: "flex", alignItems: "center", marginBottom: 6 }}>
                  <div
                    style={{
                      width: 12,
                      height: 12,
                      backgroundColor: COLORS[i % COLORS.length],
                      marginRight: 8,
                      borderRadius: 3
                    }}
                  ></div>
                  <span>{entry.name}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* Bar Chart */}
      <div className="chart-card">
        <h3>Monthly Income vs Expense</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyData} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <BarTooltip formatter={(value) => `₹${value}`} />
            <Legend />
            <Bar dataKey="income" fill="#28a745" name="Income" />
            <Bar dataKey="expense" fill="#dc3545" name="Expense" />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}
