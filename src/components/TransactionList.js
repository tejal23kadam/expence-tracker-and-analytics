import React, { useContext, useState, useMemo, useEffect } from "react";
import { GlobalContext } from "../context/GlobalState";

export default function TransactionList() {
  const { transactions, deleteTransaction, updateTransaction, filter, categories } =
    useContext(GlobalContext);

  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({ title: "", amount: "", category: "", date: "" });


  const filteredList = useMemo(() => {
    return transactions.filter((t) => {
      if (filter.title && !(t.title || "").toLowerCase().includes((filter.title || "").toLowerCase()))
        return false;
      if (filter.type) {
        if (filter.type === "income" && t.amount < 0) return false;
        if (filter.type === "expense" && t.amount >= 0) return false;
      }
      if (filter.category && t.category !== filter.category) return false;
      if (filter.dateFrom && t.date < filter.dateFrom) return false;
      if (filter.dateTo && t.date > filter.dateTo) return false;
      return true;
    });
  }, [transactions, filter]);

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentRows = filteredList.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredList.length / rowsPerPage);

  const nextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const goToPage = (page) => setCurrentPage(page);

  useEffect(() => setCurrentPage(1), [filter, transactions]);

  const startEdit = (t) => {
    setEditId(t.id);
    setEditForm({
      title: t.title ?? "",
      amount: t.amount ?? "",
      category: t.category ?? "",
      date: t.date ?? ""
    });
  };
  const cancelChange = () => {
    setEditId(null);
    setEditForm({ title: "", amount: "", category: "", date: "" });
  };

  const saveChange = () => {
    updateTransaction(editId, {
      title: editForm.title ?? "No Title",
      amount: Number(editForm.amount),
      category: editForm.category,
      date: editForm.date
    });
    cancelChange();
  };

  return (
    <div className="transaction-list-container">
      <h3>All Transactions</h3>

      {filteredList.length === 0 && <p className="no-transactions">No transactions found.</p>}

      <table className="transaction-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.map((t) => (
            <tr key={t.id}>
              {editId === t.id ? (
                <>
                  <td>
                    <input
                      type="text"
                      value={editForm.title}
                      onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={editForm.amount}
                      onChange={(e) => setEditForm({ ...editForm, amount: e.target.value })}
                    />
                  </td>
                  <td>
                    <select
                      value={editForm.category}
                      onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                    >
                      <option value="">Select</option>
                      {categories.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <input
                      type="date"
                      value={editForm.date}
                      onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                    />
                  </td>
                  <td>
                    <div className="pagination">
                      <button className="btn save" onClick={saveChange}>Save</button>
                      <button className="btn cancel" onClick={cancelChange}>Cancel</button>
                    </div>
                  </td>
                </>
              ) : (
                <>
                  <td>{t.title}</td>
                  <td className={t.amount >= 0 ? "income" : "expense"}>{t.amount}</td>
                  <td>{t.category}</td>
                  <td>{t.date}</td>
                  <td>
                    <div className="pagination">
                      <button className="btn edit" onClick={() => startEdit(t)}>Edit</button>
                      <button className="btn delete" onClick={() => deleteTransaction(t.id)}>Delete</button>
                    </div>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="pagination">
          <button onClick={prevPage} disabled={currentPage === 1}>Prev</button>
          {[...Array(totalPages).keys()].map((num) => (
            <button key={num + 1} className={currentPage === num + 1 ? "active" : ""} onClick={() => goToPage(num + 1)}>{num + 1}</button>
          ))}
          <button onClick={nextPage} disabled={currentPage === totalPages}>Next</button>
        </div>
      )}
    </div>
  );
}
