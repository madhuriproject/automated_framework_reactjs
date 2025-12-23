



import React from "react";
import {
  PieChart, Pie, Cell, Tooltip,
  BarChart, Bar, XAxis, YAxis, Legend
} from "recharts";

const COLORS = {
  PASSED: "#28a745",
  FAILED: "#dc3545"
};

export default function ScheduleChart({ executions }) {

  const summary = executions.reduce((acc, e) => {
    acc[e.status] = (acc[e.status] || 0) + 1;
    return acc;
  }, {});

  const data = Object.entries(summary).map(([status, count]) => ({
    name: status,
    value: count
  }));

  return (
    <div style={{ display: "flex", gap: "50px", marginTop: "40px" }}>

      {/* ================= PIE ================= */}
      <div>
        <h3>Status Distribution</h3>
        <PieChart width={260} height={260}>
          <Pie data={data} dataKey="value" outerRadius={90}>
            {data.map((d, i) => (
              <Cell key={i} fill={COLORS[d.name]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>

      {/* ================= BAR ================= */}
      <div>
        <h3>Status Count</h3>
        <BarChart width={260} height={260} data={data}>
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="value">
            {data.map((d, i) => (
              <Cell key={i} fill={COLORS[d.name]} />
            ))}
          </Bar>
        </BarChart>
      </div>

    </div>
  );
}
