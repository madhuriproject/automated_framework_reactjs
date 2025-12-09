import React, { useState } from "react";
import { API_BASE } from "../config";

export default function Logs() {
  const [log, setLog] = useState({
    executionId: "",
    testId: "",
    errorLog: "",
    screenshotPath: ""
  });

  const [msg, setMsg] = useState("");

  async function sendLog(e) {
    e.preventDefault();

    const body = {
      ...log,
      executionId: Number(log.executionId),
      testId: Number(log.testId)
    };

    const res = await fetch(`${API_BASE}/logs/collect`, {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify(body)
    });

    setMsg(await res.text());
  }

  return (
    <section className="card">
      <h2>Log Collector</h2>

      <form onSubmit={sendLog}>
        <input placeholder="Execution ID" value={log.executionId} onChange={(e)=>setLog({...log,executionId:e.target.value})} />
        <input placeholder="Test ID" value={log.testId} onChange={(e)=>setLog({...log,testId:e.target.value})} />
        <textarea placeholder="Error Log" value={log.errorLog} onChange={(e)=>setLog({...log,errorLog:e.target.value})}></textarea>
        <input placeholder="Screenshot Path" value={log.screenshotPath} onChange={(e)=>setLog({...log,screenshotPath:e.target.value})} />

        <button>Send Log</button>
      </form>

      <p>{msg}</p>
    </section>
  );
}
