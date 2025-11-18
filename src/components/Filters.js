import React, { useContext } from "react";
import { GlobalContext, categories } from "../context/GlobalState";

export default function Filters() {
  const { filter, setFilter } = useContext(GlobalContext);
  const initialFilter = {
    title: "",
    type: "",
    category: "",
    dateFrom: "",
    dateTo: ""
  };
  // update filter values
  const update = (key, value) => {
    setFilter({
      ...filter,
      [key]: value,
    });
  };

  return (
    <div className="tf-card">
      <h2 className="tf-title">
        Filters
      </h2>
      <div className="filter-group">
        <label>Title</label>
        <input
          type="text"
          placeholder="Search by Title"
          value={filter.title || ""}
          onChange={(e) => update("title", e.target.value)}
        />
      </div>
      <div className="filter-group">
        <label>Type</label>
        <select
          value={filter.type || ""}
          onChange={(e) => update("type", e.target.value)}
        >
          <option value="">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Category</label>
        <select
          value={filter.category || ""}
          onChange={(e) => update("category", e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-dates">
        <div className="filter-group">
          <label>Date From</label>
          <input
            type="date"
            value={filter.dateFrom || ""}
            on

            Change={(e) => update("dateFrom", e.target.value)}
          />
        </div>
        <div className="filter-group">
          <label>Date To</label>
          <input
            type="date"
            value={filter.dateTo || ""}
            onChange={(e) => update("dateTo", e.target.value)}
          />
        </div>
      </div>

      <div className="tf-btn-row">
        <button className="tf-btn-submit" onClick={() => setFilter(initialFilter)}>
          Clear Filters
        </button>


      </div>

    </div>
  );
}
