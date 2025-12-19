// import React, { useState, useEffect } from "react";
// import { API_BASE } from "../config";

// export default function TestCases() {
//   const [tests, setTests] = useState([]);
//   const [msg, setMsg] = useState("");
//   const [form, setForm] = useState({
//     testName: "",
//     testType: "API",
//     framework: "REST-Assured",
//     endpoint: "",
//     method: "POST",
//     description: ""
//   });

//   useEffect(() => { loadTests(); }, []);

//   async function loadTests() {
//     const res = await fetch(`${API_BASE}/tests`);
//     const data = await res.json();
//     setTests(data);
//   }

//   async function createTest(e) {
//     e.preventDefault();
//     setMsg("");

//     let r = await fetch(`${API_BASE}/tests/integrate`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(form)
//     });

//     if (r.ok) {
//       setMsg("Created Successfully");
//       loadTests();
//     } else {
//       setMsg("Error creating test");
//     }
//   }

//   async function execute(id) {
//     setMsg("Executing...");
//     let res = await fetch(`${API_BASE}/tests/${id}/execute`, { method: "POST" });

//     if (res.ok) {
//       setMsg("Execution done");
//     } else {
//       setMsg("Execution failed");
//     }
//   }

//   return (
//     <section className="card">
//       <h2>Create Test Case</h2>
//       <form onSubmit={createTest}>
//         <input placeholder="Test Name" value={form.testName} onChange={(e)=>setForm({...form,testName:e.target.value})} required />
//         <input placeholder="Endpoint" value={form.endpoint} onChange={(e)=>setForm({...form,endpoint:e.target.value})} required />
//         <textarea placeholder="Description" value={form.description} onChange={(e)=>setForm({...form,description:e.target.value})}></textarea>
//         <button>Create</button>
//       </form>
//       <p>{msg}</p>

//       <h2>All Test Cases</h2>
//       <table className="table">
//         <thead>
//           <tr><th>ID</th><th>Name</th><th>Type</th><th>Execute</th></tr>
//         </thead>
//         <tbody>
//           {tests.map(t => (
//             <tr key={t.id}>
//               <td>{t.id}</td>
//               <td>{t.testName}</td>
//               <td>{t.testType}</td>
//               <td><button onClick={()=>execute(t.id)}>Run</button></td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </section>
//   );
// }



































import React, { useState, useEffect } from "react";
import { API_BASE } from "../config";
import AnalyticsChart from "./AnalyticsChart";

export default function TestCases() {
  const [tests, setTests] = useState([]);
  const [msg, setMsg] = useState("");
  const [lastStatus, setLastStatus] = useState(null);
  const [showChart, setShowChart] = useState(false);

  const [form, setForm] = useState({
    testName: "",
    testType: "API",
    framework: "REST-Assured",
    endpoint: "",
    method: "POST",
    description: ""
  });

  useEffect(() => { loadTests(); }, []);

  async function loadTests() {
    const res = await fetch(`${API_BASE}/tests`);
    setTests(await res.json());
  }

  async function createTest(e) {
    e.preventDefault();
    setMsg("");

    const r = await fetch(`${API_BASE}/tests/integrate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    setMsg(r.ok ? "Created Successfully" : "Error creating test");
    loadTests();
  }

  async function execute(id) {
    setMsg("Executing...");
    setShowChart(false);

    const res = await fetch(`${API_BASE}/tests/${id}/execute`, { method: "POST" });
    const data = await res.json();

    setLastStatus(data.status);
    setMsg(`Execution ${data.status}`);
    setShowChart(true);
  }

  return (
    <section className="card">
      <h2>Create Test Case</h2>

      <form onSubmit={createTest}>
        <input placeholder="Test Name" value={form.testName}
          onChange={(e)=>setForm({...form,testName:e.target.value})} required />

        <input placeholder="Endpoint" value={form.endpoint}
          onChange={(e)=>setForm({...form,endpoint:e.target.value})} required />

        <textarea placeholder="Description"
          value={form.description}
          onChange={(e)=>setForm({...form,description:e.target.value})} />

        <button>Create</button>
      </form>

      <p>{msg}</p>

      {lastStatus && (
        <h3>
          Status:
          <span style={{
            marginLeft: "10px",
            color: lastStatus === "PASSED" ? "green" : "red"
          }}>
            {lastStatus}
          </span>
        </h3>
      )}

      <h2>All Test Cases</h2>

      <table className="table">
        <thead>
          <tr><th>ID</th><th>Name</th><th>Type</th><th>Execute</th></tr>
        </thead>
        <tbody>
          {tests.map(t => (
            <tr key={t.id}>
              <td>{t.id}</td>
              <td>{t.testName}</td>
              <td>{t.testType}</td>
              <td>
                <button onClick={()=>execute(t.id)}>Run</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showChart && <AnalyticsChart suiteId={1} />}
    </section>
  );
}