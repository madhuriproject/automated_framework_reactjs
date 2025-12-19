import React, { useEffect, useState } from "react";
import { API_BASE } from "../config";
import {
  PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis
} from "recharts";

const COLORS = ["#28a745", "#dc3545"];

export default function AnalyticsChart({ suiteId }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE}/analytics/trends/${suiteId}`)
      .then(res => res.json())
      .then(json => {
        const chartData = Object.keys(json).map(k => ({
          name: k,
          value: json[k]
        }));
        setData(chartData);
      });
  }, [suiteId]);

  if (!data.length) return null;

  return (
    <div style={{ display: "flex", gap: "40px", marginTop: "20px" }}>
      
      {/* PIE CHART */}
      <div>
        <h3>Result Distribution</h3>
        <PieChart width={300} height={300}>
          <Pie data={data} dataKey="value" nameKey="name" outerRadius={100}>
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>

      {/* BAR CHART */}
      <div>
        <h3>Result Count</h3>
        <BarChart width={300} height={300} data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" />
        </BarChart>
      </div>
    </div>
  );
}
