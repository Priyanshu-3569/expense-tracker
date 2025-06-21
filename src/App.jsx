import React, { useState, useEffect } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Filters from "./components/Filters";
import ExpenseChart from "./components/ExpenseChart";
import "./index.css";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [dateFilter, setDateFilter] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("expenses"));
    if (saved) setExpenses(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expense) => setExpenses([expense, ...expenses]);

  const deleteExpense = (id) =>
    setExpenses(expenses.filter((e) => e.id !== id));

  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch = expense.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter
      ? expense.category === categoryFilter
      : true;
    const matchesDate = dateFilter
      ? new Date(expense.date).toDateString() ===
        new Date(dateFilter).toDateString()
      : true;

    return matchesSearch && matchesCategory && matchesDate;
  });

  const total = filteredExpenses.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="App">
      <h1>Expense Tracker</h1>
      <h2>Total Spent: ₹{total.toFixed(2)}</h2>
      <ExpenseForm onAddExpense={addExpense} />
      <Filters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
      />
      <ExpenseChart expenses={filteredExpenses} />
      <ExpenseList expenses={filteredExpenses} onDelete={deleteExpense} />
    </div>
  );
}

export default App;

