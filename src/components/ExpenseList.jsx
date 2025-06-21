import React from "react";
import ExpenseItem from "./ExpenseItem";

function ExpenseList({ expenses, onDelete }) {
  return (
    <div className="expense-list">
      {expenses.length === 0 ? (
        <p>No expenses found.</p>
      ) : (
        expenses.map((exp) => (
          <ExpenseItem key={exp.id} expense={exp} onDelete={onDelete} />
        ))
      )}
    </div>
  );
}

export default ExpenseList;
