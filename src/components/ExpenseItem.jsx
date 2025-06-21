import React from "react";

function ExpenseItem({ expense, onDelete }) {
  return (
    <div className="expense-item">
      <h3>{expense.title}</h3>
      <p>₹{expense.amount.toFixed(2)}</p>
      <p>{expense.category}</p>
      <p>{new Date(expense.date).toDateString()}</p>
      <button onClick={() => onDelete(expense.id)}>Delete</button>
    </div>
  );
}

export default ExpenseItem;
