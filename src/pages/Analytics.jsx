import React, { useState } from "react";
import { API_BASE } from "../config";

export default function Analytics() {
  const [suiteId, setSuiteId] = useState("");
  const [result, setResult] = useState("");

  async function fetchTrend(e) {
    e.preventDefault();
    const res = await fetch(`${API_BASE}/analytics/trends/${suiteId}`);
    setResult(await res.text());
  }

  return (
    <section className="card">
      <h2>Analytics</h2>

      <form onSubmit={fetchTrend}>
        <input placeholder="Suite ID" value={suiteId} onChange={(e)=>setSuiteId(e.target.value)} />
        <button>Get Trend</button>
      </form>

      <pre>{result}</pre>
    </section>
  );
}
