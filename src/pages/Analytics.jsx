


import React, { useState } from "react";
import { API_BASE } from "../config";
import AnalyticsChart from "./AnalyticsChart";

export default function Analytics() {

  /* ---------------- INSERT TEST RESULTS ---------------- */

  const [rows, setRows] = useState([
    { suiteId: "", testId: "", executionId: "", result: "PASSED", durationSeconds: "" }
  ]);

  const [saveMsg, setSaveMsg] = useState("");

  function addRow() {
    setRows([...rows, { suiteId: "", testId: "", executionId: "", result: "PASSED", durationSeconds: "" }]);
  }

  function removeRow(index) {
    setRows(rows.filter((_, i) => i !== index));
  }

  function updateRow(index, field, value) {
    const updated = [...rows];
    updated[index][field] = value;
    setRows(updated);
  }

  async function saveResults() {
    setSaveMsg("");

    try {
      const payload = rows.map(r => ({
        suiteId: Number(r.suiteId),
        testId: Number(r.testId),
        executionId: Number(r.executionId),
        result: r.result,
        durationSeconds: Number(r.durationSeconds)
      }));

      const res = await fetch(`${API_BASE}/test-results`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setSaveMsg("Test results saved successfully");
        setRows([{ suiteId: "", testId: "", executionId: "", result: "PASSED", durationSeconds: "" }]);
      } else {
        setSaveMsg("Failed to save test results");
      }
    } catch (err) {
      setSaveMsg("Error while saving data");
    }
  }

  /* ---------------- ANALYTICS VIEW ---------------- */

  const [suiteId, setSuiteId] = useState("");
  const [result, setResult] = useState({});
  const [error, setError] = useState("");

  async function fetchTrend(e) {
    e.preventDefault();
    setError("");
    setResult({});

    if (!suiteId) {
      setError("Please enter Suite ID");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/analytics/trends/${suiteId}`);
      const data = await res.json();
      setResult(data);
    } catch {
      setError("Failed to fetch analytics");
    }
  }

  return (
    <section className="card">

      {/* ================= INSERT SECTION ================= */}

      <h2>Insert Test Results</h2>

      <table className="table table-bordered mt-3">
        <thead className="table-dark">
          <tr>
            <th>Suite ID</th>
            <th>Test ID</th>
            <th>Execution ID</th>
            <th>Result</th>
            <th>Duration (sec)</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td><input value={r.suiteId} onChange={e => updateRow(i,"suiteId",e.target.value)} /></td>
              <td><input value={r.testId} onChange={e => updateRow(i,"testId",e.target.value)} /></td>
              <td><input value={r.executionId} onChange={e => updateRow(i,"executionId",e.target.value)} /></td>
              <td>
                <select value={r.result} onChange={e => updateRow(i,"result",e.target.value)}>
                  <option>PASSED</option>
                  <option>FAILED</option>
                </select>
              </td>
              <td><input value={r.durationSeconds} onChange={e => updateRow(i,"durationSeconds",e.target.value)} /></td>
              <td>
                {rows.length > 1 && (
                  <button className="btn btn-danger btn-sm" onClick={() => removeRow(i)}>X</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="btn btn-secondary btn-sm" onClick={addRow}>
        + Add Row
      </button>

      <button className="btn btn-primary btn-sm ms-2" onClick={saveResults}>
        Save Results
      </button>

      {saveMsg && <p className="mt-2">{saveMsg}</p>}

      <hr />

      {/* ================= ANALYTICS SECTION ================= */}

      <h2>Analytics</h2>

      <form onSubmit={fetchTrend}>
        <input
          placeholder="Enter Suite ID"
          value={suiteId}
          onChange={(e) => setSuiteId(e.target.value)}
        />
        <button>Get Trend</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {Object.keys(result).length > 0 && (
        <>
          <h3>Status Summary</h3>

          <table className="table table-bordered mt-3">
            <thead>
              <tr>
                <th>Status</th>
                <th>Count</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(result).map(([status, count]) => (
                <tr key={status}>
                  <td>{status}</td>
                  <td>{count}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <AnalyticsChart suiteId={suiteId} />
        </>
      )}

    </section>
  );
}
