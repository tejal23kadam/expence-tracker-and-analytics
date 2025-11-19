import React, { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

export default function TransactionForm() {
    const { addTransaction, categories } = useContext(GlobalContext);
    const [form, setForm] = useState({
        title: "",
        amount: "",
        type: "expense",
        category: "",
        date: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newData = {
            ...form,
            amount: form.type === "expense"
                ? -Math.abs(Number(form.amount))
                : Math.abs(Number(form.amount))
        };
        addTransaction(newData);
        setForm({ title: "", amount: "", type: "expense", category: "", date: "" });
    };

    return (
        <div className="tf-card">
            <h2 className="tf-title"> Add New Transaction </h2>
            <form onSubmit={handleSubmit} className="tf-form">
                <div className="tf-group">
                    <label>Title</label>
                    <input
                        type="text"
                        name="title"
                        required
                        value={form.title}
                        onChange={handleChange}
                    />
                </div>

                <div className="tf-group">
                    <label>Amount</label>
                    <input
                        type="number"
                        name="amount"
                        required
                        value={form.amount}
                        onChange={handleChange}
                    />
                </div>

                <div className="tf-group">
                    <label>Type</label>
                    <select name="type" value={form.type} onChange={handleChange}>
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                </div>

                {/*category from context api */}
                <div className="tf-group">
                    <label>Category</label>
                    <select
                        name="category"
                        required
                        value={form.category}
                        onChange={handleChange}
                    >
                        <option value="">Select Category</option>
                        {categories.map((cat, i) => (
                            <option key={i} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                <div className="tf-group">
                    <label>Date</label>
                    <input
                        type="date"
                        name="date"
                        required
                        value={form.date}
                        onChange={handleChange}
                    />
                </div>

                <div className="tf-btn-row">
                    <button className="tf-btn-submit" type="submit">
                        Add
                    </button>
                </div>
            </form>
        </div>
    );
}
