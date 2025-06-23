import React, { useState, useEffect } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Filters from "./components/Filters";
import ExpenseChart from "./components/ExpenseChart";
import Login from "./components/Login";
import "./index.css";

function App() {
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [expenses, setExpenses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [dateFilter, setDateFilter] = useState(null);

  // Load user-specific expenses on login
  useEffect(() => {
    if (username) {
      const saved = JSON.parse(localStorage.getItem(`expenses_${username}`));
      if (saved) setExpenses(saved);
    }
  }, [username]);

  // Save user-specific expenses to localStorage
  useEffect(() => {
    if (username) {
      localStorage.setItem(`expenses_${username}`, JSON.stringify(expenses));
    }
  }, [expenses, username]);

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

  if (!username) {
    return <Login onLogin={setUsername} />;
  }

  return (
    <div className="App">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Expense Tracker</h1>
        <button className="logout-btn"
          onClick={() => {
            localStorage.removeItem("username");
            setUsername(null);
          }}
        >
          Logout
        </button>
      </div>

      <h2>Welcome, {username}!</h2>
      <h3>Total Spent: ₹{total.toFixed(2)}</h3>

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


