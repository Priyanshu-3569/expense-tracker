import React, { useState, useEffect } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";

function App() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const savedExpenses = JSON.parse(localStorage.getItem("expenses"));
    if (savedExpenses) {
      setExpenses(savedExpenses);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expense) => {
    setExpenses([expense, ...expenses]);
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const totalAmount = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="App">
      <h1>Expense Tracker</h1>
      <h2>Total Spent: ₹ {totalAmount.toFixed(2)}</h2>

      <ExpenseForm onAddExpense={addExpense} />
      <ExpenseList expenses={expenses} onDelete={deleteExpense} />
    </div>
  );
}

export default App;
