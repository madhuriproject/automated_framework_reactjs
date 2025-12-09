import React, { useState } from "react";
import { API_BASE } from "../config";

export default function Reports() {
  const [msg, setMsg] = useState("");

  async function genHtml() {
    const res = await fetch(`${API_BASE}/reports/generate/html`);
    setMsg(await res.text());
  }

  async function genCsv() {
    const res = await fetch(`${API_BASE}/reports/generate/csv`);
    setMsg(await res.text());
  }

  return (
    <section className="card">
      <h2>Reports</h2>

      <button onClick={genHtml}>Generate HTML</button>
      <button onClick={genCsv}>Generate CSV</button>

      <pre>{msg}</pre>
    </section>
  );
}
