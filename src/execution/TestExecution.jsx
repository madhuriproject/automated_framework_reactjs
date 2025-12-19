import React, { useEffect, useState } from "react";
import { API_BASE } from "../config";
import ExecutionCharts from "./ExecutionCharts";

export default function TestExecution() {

  const [executions, setExecutions] = useState([]);

  useEffect(() => {
    loadExecutions();
  }, []);

  async function loadExecutions() {
    const res = await fetch(`${API_BASE}/tests/getalltestexecution`);
    setExecutions(await res.json());
  }

  async function deleteExecution(id) {
    await fetch(`${API_BASE}/tests/deleteExecutionexc/${id}`, { method: "DELETE" });
    loadExecutions();
  }

  return (
    <section className="card">
      <h2>Test Executions</h2>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Triggered By</th>
            <th>Status</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {executions.map(e => (
            <tr key={e.id}>
              <td>{e.id}</td>
              <td>{e.triggeredBy}</td>
              <td style={{ color: e.status === "PASSED" ? "green" : "red" }}>
                {e.status}
              </td>
              <td>
                <button onClick={() => deleteExecution(e.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Charts */}
      <ExecutionCharts executions={executions} />
    </section>
  );
}
