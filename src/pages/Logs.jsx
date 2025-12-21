// import React, { useState } from "react";
// import { API_BASE } from "../config";

// export default function Logs() {
//   const [log, setLog] = useState({
//     executionId: "",
//     testId: "",
//     errorLog: "",
//     screenshotPath: ""
//   });

//   const [msg, setMsg] = useState("");

//   async function sendLog(e) {
//     e.preventDefault();

//     const body = {
//       ...log,
//       executionId: Number(log.executionId),
//       testId: Number(log.testId)
//     };

//     const res = await fetch(`${API_BASE}/logs/collect`, {
//       method:"POST",
//       headers:{"Content-Type":"application/json"},
//       body: JSON.stringify(body)
//     });

//     setMsg(await res.text());
//   }

//   return (
//     <section className="card">
//       <h2>Log Collector</h2>

//       <form onSubmit={sendLog}>
//         <input placeholder="Execution ID" value={log.executionId} onChange={(e)=>setLog({...log,executionId:e.target.value})} />
//         <input placeholder="Test ID" value={log.testId} onChange={(e)=>setLog({...log,testId:e.target.value})} />
//         <textarea placeholder="Error Log" value={log.errorLog} onChange={(e)=>setLog({...log,errorLog:e.target.value})}></textarea>
//         <input placeholder="Screenshot Path" value={log.screenshotPath} onChange={(e)=>setLog({...log,screenshotPath:e.target.value})} />

//         <button>Send Log</button>
//       </form>

//       <p>{msg}</p>
//     </section>
//   );
// }


import React, { useEffect, useState } from "react";
import { API_BASE } from "../config";

export default function Logs() {

  const [log, setLog] = useState({
    executionId: "",
    testId: "",
    errorLog: "",
    screenshotPath: ""
  });

  const [logs, setLogs] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    loadLogs();
  }, []);

  async function loadLogs() {
    const res = await fetch(`${API_BASE}/logs`);
    const data = await res.json();
    setLogs(data);
  }

  async function sendLog(e) {
    e.preventDefault();
    setMsg("");

    const body = {
      executionId: Number(log.executionId),
      testId: Number(log.testId),
      errorLog: log.errorLog,
      screenshotPath: log.screenshotPath
    };

    const res = await fetch(`${API_BASE}/logs/collect`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    if (res.ok) {
      setMsg("Log saved successfully");
      setLog({
        executionId: "",
        testId: "",
        errorLog: "",
        screenshotPath: ""
      });
      loadLogs();
    } else {
      setMsg("Failed to save log");
    }
  }

  return (
    <section className="card">

      <h2>Log Collector</h2>

      {/* LOG FORM */}
      <form onSubmit={sendLog}>
        <input
          placeholder="Execution ID"
          value={log.executionId}
          onChange={(e) => setLog({ ...log, executionId: e.target.value })}
          required
        />

        <input
          placeholder="Test ID"
          value={log.testId}
          onChange={(e) => setLog({ ...log, testId: e.target.value })}
          required
        />

        <textarea
          placeholder="Error Log"
          value={log.errorLog}
          onChange={(e) => setLog({ ...log, errorLog: e.target.value })}
          required
        />

        <input
          placeholder="Screenshot Path"
          value={log.screenshotPath}
          onChange={(e) => setLog({ ...log, screenshotPath: e.target.value })}
        />

        <button>Send Log</button>
      </form>

      {msg && <p>{msg}</p>}

      {/* LOG TABLE */}
      <h3>Collected Logs</h3>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Execution ID</th>
            <th>Test ID</th>
            <th>Error Log</th>
            <th>Screenshot</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((l) => (
            <tr key={l.id}>
              <td>{l.executionId}</td>
              <td>{l.testId}</td>
              <td>{l.errorLog}</td>
              <td>{l.screenshotPath || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </section>
  );
}
