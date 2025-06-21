import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function ExpenseChart({ expenses }) {
  const categoryMap = {};

  expenses.forEach((expense) => {
    if (!categoryMap[expense.category]) {
      categoryMap[expense.category] = 0;
    }
    categoryMap[expense.category] += expense.amount;
  });

  const data = {
    labels: Object.keys(categoryMap),
    datasets: [
      {
        label: "Expenses",
        data: Object.values(categoryMap),
        backgroundColor: ["#f87171", "#60a5fa", "#34d399", "#facc15"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <Pie data={data} />
    </div>
  );
}

export default ExpenseChart;
