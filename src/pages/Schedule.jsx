

import React, { useState } from "react";
import { API_BASE } from "../config";
 import ScheduleChart from "../execution/ScheduleChart";

export default function Schedule() {

  /* ================= INPUT TABLE ================= */

  const [suiteName, setSuiteName] = useState("");
  const [rows, setRows] = useState([{ testId: "" }]);
  const [executions, setExecutions] = useState([]);
  const [error, setError] = useState("");

  function addRow() {
    setRows([...rows, { testId: "" }]);
  }

  function removeRow(index) {
    setRows(rows.filter((_, i) => i !== index));
  }

  function updateRow(index, value) {
    const updated = [...rows];
    updated[index].testId = value;
    setRows(updated);
  }

  /* ================= RUN SCHEDULE ================= */

  async function runSchedule(e) {
    e.preventDefault();
    setError("");
    setExecutions([]);

    const tests = rows
      .map(r => Number(r.testId))
      .filter(id => !isNaN(id));

    const payload = {
      suiteName,
      triggeredBy: "QA-Team",
      executionMode: "PARALLEL",
      tests
    };

    try {
      const res = await fetch(`${API_BASE}/schedule/run`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      setExecutions(data);
    } catch {
      setError("Failed to run schedule");
    }
  }

  return (
    <section className="card">

      <h2>Schedule Test Suite</h2>

      <input
        placeholder="Suite Name"
        value={suiteName}
        onChange={e => setSuiteName(e.target.value)}
      />

      {/* ================= TABLE INPUT ================= */}

      <table className="table table-bordered mt-3">
        <thead className="table-dark">
          <tr>
            <th>Test ID</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td>
                <input
                  value={r.testId}
                  onChange={e => updateRow(i, e.target.value)}
                />
              </td>
              <td>
                {rows.length > 1 && (
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => removeRow(i)}
                  >
                    X
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="btn btn-secondary btn-sm" onClick={addRow}>
        + Add Row
      </button>

      <button className="btn btn-primary btn-sm ms-2" onClick={runSchedule}>
        Run Schedule
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* ================= RESULTS ================= */}

      {executions.length > 0 && (
        <>
          <h3 className="mt-4">Execution Results</h3>

          <table className="table table-bordered mt-2">
            <thead className="table-dark">
              <tr>
                <th>Execution ID</th>
                <th>Triggered By</th>
                <th>Execution Mode</th>
                <th>Status</th>
                <th>Started At</th>
                <th>Completed At</th>
              </tr>
            </thead>
            <tbody>
              {executions.map(e => (
                <tr key={e.id}>
                  <td>{e.id}</td>
                  <td>{e.triggeredBy}</td>
                  <td>{e.executionMode}</td>
                  <td
                    style={{
                      color: e.status === "PASSED" ? "green" : "red",
                      fontWeight: "bold"
                    }}
                  >
                    {e.status}
                  </td>
                  <td>{e.startedAt}</td>
                  <td>{e.completedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <ScheduleChart executions={executions} />
        </>
      )}

    </section>
  );
}
