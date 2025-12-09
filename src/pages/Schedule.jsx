import React, { useState } from "react";
import { API_BASE } from "../config";

export default function Schedule() {
  const [suiteName, setSuiteName] = useState("");
  const [testIds, setTestIds] = useState("");
  const [msg, setMsg] = useState("");

  async function submit(e) {
    e.preventDefault();

    let ids = testIds.split(",").map(x => Number(x.trim()));

    const body = {
      suiteName,
      triggeredBy: "UI",
      executionMode: "PARALLEL",
      testCaseIds: ids
    };

    const res = await fetch(`${API_BASE}/schedule/run`, {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify(body)
    });

    let t = await res.text();
    setMsg(t);
  }

  return (
    <section className="card">
      <h2>Schedule Test Suite</h2>

      <form onSubmit={submit}>
        <input placeholder="Suite Name" value={suiteName} onChange={(e)=>setSuiteName(e.target.value)} />
        <input placeholder="Comma separated Test IDs" value={testIds} onChange={(e)=>setTestIds(e.target.value)} />

        <button>Run Schedule</button>
      </form>

      <p>{msg}</p>
    </section>
  );
}
