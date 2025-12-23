

import React, { useEffect, useState } from "react";
import { API_BASE } from "../config";
import {
  PieChart, Pie, Cell, Tooltip,
  BarChart, Bar, XAxis, YAxis, Legend
} from "recharts";

const PASS_COLOR = "#28a745";
const FAIL_COLOR = "#dc3545";

export default function AnalyticsChart({ executionId }) {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/tests/executions/${executionId}`)
      .then(res => res.json())
      .then(data => {
        setStatus(data.status); // PASSED / FAILED
      });
  }, [executionId]);

  if (!status) return null;

  const isPassed = status === "PASSED";
  const color = isPassed ? PASS_COLOR : FAIL_COLOR;

  // Chart data (single execution)
  const chartData = [
    { name: status, value: 1 }
  ];

  return (
    <div style={{ display: "flex", gap: "50px", marginTop: "30px" }}>

      {/* ================= PIE CHART ================= */}
      <div>
        <h3>Result Distribution</h3>

        <PieChart width={260} height={260}>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            outerRadius={90}
          >
            <Cell fill={color} />
          </Pie>
          <Tooltip formatter={() => status} />
        </PieChart>

        {/* Small legend box */}
        <div style={{ marginTop: "10px", display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: 14,
              height: 14,
              backgroundColor: color,
              marginRight: 8
            }}
          />
          <strong style={{ color }}>{status}</strong>
        </div>
      </div>

      {/* ================= BAR CHART ================= */}
      <div>
        <h3>Result Count</h3>

        <BarChart width={260} height={260} data={chartData}>
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip formatter={() => status} />
          <Bar dataKey="value" fill={color} />
        </BarChart>
      </div>
    </div>
  );
}
