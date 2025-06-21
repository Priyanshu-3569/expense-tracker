import React from "react";

function ExpenseItem({ expense, onDelete }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", margin: "10px 0" }}>
      <span>{expense.title}</span>
      <span>₹ {expense.amount.toFixed(2)}</span>
      <button onClick={() => onDelete(expense.id)}>Delete</button>
    </div>
  );
}

export default ExpenseItem;
