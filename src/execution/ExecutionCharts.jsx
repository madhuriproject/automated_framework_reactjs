import React from "react";
import {
  PieChart, Pie, Cell, Tooltip,
  BarChart, Bar, XAxis, YAxis
} from "recharts";

const COLORS = ["#28a745", "#dc3545"];

export default function ExecutionCharts({ executions }) {

  const summary = executions.reduce((acc, e) => {
    acc[e.status] = (acc[e.status] || 0) + 1;
    return acc;
  }, {});

  const data = Object.keys(summary).map(k => ({
    name: k,
    value: summary[k]
  }));

  if (!data.length) return null;

  return (
    <div style={{ display: "flex", gap: "40px", marginTop: "20px" }}>
      
      {/* PIE */}
      <PieChart width={300} height={300}>
        <Pie data={data} dataKey="value" nameKey="name" outerRadius={100}>
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>

      {/* BAR */}
      <BarChart width={300} height={300} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" />
      </BarChart>
    </div>
  );
}
