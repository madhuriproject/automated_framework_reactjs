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



































// import React, { useState, useEffect } from "react";
// import { API_BASE } from "../config";
// import AnalyticsChart from "./AnalyticsChart";

// export default function TestCases() {
//   const [tests, setTests] = useState([]);
//   const [msg, setMsg] = useState("");
//   const [lastStatus, setLastStatus] = useState(null);
//   const [showChart, setShowChart] = useState(false);

//   const [form, setForm] = useState({
//     testName: "",
//     testType: "API",
//     framework: "REST-Assured",
//     endpoint: "",
//     method: "POST",
//     description: ""
//   });
// const [totalTests, setTotalTests] = useState(0);
// async function loadTests() {
//   const res = await fetch(`${API_BASE}/tests`);
//   const data = await res.json();
//   setTests(data);
//   setTotalTests(data.length);
// }


//   useEffect(() => { loadTests(); }, []);

//   async function loadTests() {
//     const res = await fetch(`${API_BASE}/tests`);
//     setTests(await res.json());
//   }

//   async function createTest(e) {
//     e.preventDefault();
//     setMsg("");

//     const r = await fetch(`${API_BASE}/tests/integrate`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(form)
//     });

//     setMsg(r.ok ? "Created Successfully" : "Error creating test");
//     loadTests();
//   }

//   async function execute(id) {
//     setMsg("Executing...");
//     setShowChart(false);

//     const res = await fetch(`${API_BASE}/tests/${id}/execute`, { method: "POST" });
//     const data = await res.json();

//     setLastStatus(data.status);
//     setMsg(`Execution ${data.status}`);
//     setShowChart(true);
//   }

//   return (
//     <section className="card">
//       <h2>Create Test Case</h2>

//       <form onSubmit={createTest}>
//         <input placeholder="Test Name" value={form.testName}
//           onChange={(e)=>setForm({...form,testName:e.target.value})} required />

//         <input placeholder="Endpoint" value={form.endpoint}
//           onChange={(e)=>setForm({...form,endpoint:e.target.value})} required />

//         <textarea placeholder="Description"
//           value={form.description}
//           onChange={(e)=>setForm({...form,description:e.target.value})} />

//         <button>Create</button>
//       </form>

//       <p>{msg}</p>

//       {lastStatus && (
//         <h3>
//           Status:
//           <span style={{
//             marginLeft: "10px",
//             color: lastStatus === "PASSED" ? "green" : "red"
//           }}>
//             {lastStatus}
//           </span>
//         </h3>
//       )}

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
//               <td>
//                 <button onClick={()=>execute(t.id)}>Run</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//         {totalTests > 0 && (
//   <div className="alert alert-info">
//     🔔 Total Tests Created: {totalTests}
//   </div>
// )}

//       </table>

//       {showChart && <AnalyticsChart suiteId={1} />}
//     </section>
//   );
// }







// import React, { useEffect, useState } from "react";
// import { API_BASE } from "../config";
// import AnalyticsChart from "./AnalyticsChart";

// export default function TestCases() {

//   const [tests, setTests] = useState([]);
//   const [msg, setMsg] = useState("");
//   const [lastStatus, setLastStatus] = useState(null);
//   const [showChart, setShowChart] = useState(false);
//   const [totalTests, setTotalTests] = useState(0);

//   const [form, setForm] = useState({
//     testName: "",
//     testType: "API",
//     framework: "REST-Assured",
//     endpoint: "",
//     method: "GET",
//     description: ""
//   });

//   // ---------------- LOAD TESTS ----------------
//   useEffect(() => {
//     loadTests();
//   }, []);

//   async function loadTests() {
//     const res = await fetch(`${API_BASE}/tests`);
//     const data = await res.json();
//     setTests(data);
//     setTotalTests(data.length);
//   }

//   // ---------------- CREATE TEST ----------------
//   async function createTest(e) {
//     e.preventDefault();
//     setMsg("");

//     const res = await fetch(`${API_BASE}/tests/integrate`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(form)
//     });

//     const data = await res.json();

//     setTotalTests(data.totalTests);          // 🔔 alert count
//     setMsg("Test created successfully");
//     setForm({
//       testName: "",
//       testType: "API",
//       framework: "REST-Assured",
//       endpoint: "",
//       method: "GET",
//       description: ""
//     });

//     loadTests();
//   }

//   // ---------------- EXECUTE TEST ----------------
//   async function executeTest(id) {
//     setMsg("Executing...");
//     setShowChart(false);

//     const res = await fetch(`${API_BASE}/tests/${id}/execute`, {
//       method: "POST"
//     });

//     const data = await res.json();

//     setLastStatus(data.status);
//     setMsg(`Execution ${data.status}`);
//     setShowChart(true);
//   }









//   // ⭐ NEW ---------------- DELETE TEST ----------------
//   async function deleteTest(id) {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this test case?"
//     );

//     if (!confirmDelete) return;

//     try {
//       const res = await fetch(
//         `${API_BASE}/tests/deleteExecution/${id}`,
//         { method: "DELETE" }
//       );

//       if (res.ok) {
//         setMsg("Test case deleted successfully");
//         loadTests(); // refresh list & count
//       } else {
//         setMsg("Failed to delete test case");
//       }
//     } catch (err) {
//       setMsg("Error while deleting test case");
//     }
//   }


//   return (
//     <section className="card">

//       <h2>Create Test Case</h2>

//       {/* CREATE FORM */}
//       <form onSubmit={createTest}>
//         <input
//           placeholder="Test Name"
//           value={form.testName}
//           onChange={(e) => setForm({ ...form, testName: e.target.value })}
//           required
//         />

//         <select
//           value={form.testType}
//           onChange={(e) => setForm({ ...form, testType: e.target.value })}
//         >
//           <option value="API">API</option>
//           <option value="WEB">WEB</option>
//         </select>

//         <input
//           placeholder="Framework"
//           value={form.framework}
//           onChange={(e) => setForm({ ...form, framework: e.target.value })}
//         />

//         <input
//           placeholder="Endpoint (URL)"
//           value={form.endpoint}
//           onChange={(e) => setForm({ ...form, endpoint: e.target.value })}
//           required
//         />

//         <select
//           value={form.method}
//           onChange={(e) => setForm({ ...form, method: e.target.value })}
//         >
//           <option>GET</option>
//           <option>POST</option>
//           <option>PUT</option>
//           <option>DELETE</option>
//         </select>

//         <textarea
//           placeholder="Description"
//           value={form.description}
//           onChange={(e) => setForm({ ...form, description: e.target.value })}
//         />

//         <button>Create</button>
//       </form>

//       <p>{msg}</p>

//       {/* 🔔 TOTAL TEST ALERT */}
//       {totalTests > 0 && (
//         <div className="alert alert-info">
//           🔔 Total Tests Created: {totalTests}
//         </div>
//       )}

//       {/* EXECUTION STATUS */}
//       {lastStatus && (
//         <h3>
//           Status:
//           <span
//             style={{
//               marginLeft: "10px",
//               color: lastStatus === "PASSED" ? "green" : "red"
//             }}
//           >
//             {lastStatus}
//           </span>
//         </h3>
//       )}

//       <h2>All Test Cases</h2>

//       {/* TEST LIST */}
//       <table className="table table-bordered">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Test Name</th>
//             <th>Type</th>
//             <th>Execute</th>
//               <th>Delete0000000000000000000000000000000000000000000</th> {/* ⭐ NEW */}
//           </tr>
//         </thead>
//         <tbody>
//           {tests.map((t) => (
//             <tr key={t.id}>
//               <td>{t.id}</td>
//               <td>{t.testName}</td>
//               <td>{t.testType}</td>
//               <td>
//                 <button onClick={() => executeTest(t.id)}>Run</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* ANALYTICS CHART (OPTIONAL) */}
//       {showChart && <AnalyticsChart suiteId={1} />}

//     </section>
//   );
// }




























// import React, { useEffect, useState } from "react";
// import { API_BASE } from "../config";
// import AnalyticsChart from "./AnalyticsChart";

// export default function TestCases() {

//   const [tests, setTests] = useState([]);
//   const [msg, setMsg] = useState("");
//   const [lastStatus, setLastStatus] = useState(null);
//   const [showChart, setShowChart] = useState(false);
//   const [totalTests, setTotalTests] = useState(0);

//   const [form, setForm] = useState({
//     testName: "",
//     testType: "API",
//     framework: "REST-Assured",
//     endpoint: "",
//     method: "GET",
//     description: ""
//   });

//   // ---------------- LOAD TESTS ----------------
//   useEffect(() => {
//     loadTests();
//   }, []);

//   async function loadTests() {
//     const res = await fetch(`${API_BASE}/tests`);
//     const data = await res.json();
//     setTests(data);
//     setTotalTests(data.length);
//   }

//   // ---------------- CREATE TEST ----------------
//   async function createTest(e) {
//     e.preventDefault();
//     setMsg("");

//     const res = await fetch(`${API_BASE}/tests/integrate`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(form)
//     });

//     await res.json();

//     setMsg("Test created successfully");
//     setForm({
//       testName: "",
//       testType: "API",
//       framework: "REST-Assured",
//       endpoint: "",
//       method: "GET",
//       description: ""
//     });

//     loadTests();
//   }

//   // ---------------- EXECUTE TEST ----------------
//   async function executeTest(id) {
//     setMsg("Executing...");
//     setShowChart(false);

//     const res = await fetch(`${API_BASE}/tests/${id}/execute`, {
//       method: "POST"
//     });

//     const data = await res.json();

//     setLastStatus(data.status);
//     setMsg(`Execution ${data.status}`);
//     setShowChart(true);
//   }

//   // ⭐ NEW ---------------- DELETE TEST ----------------
//   async function deleteTest(id) {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this test case?"
//     );

//     if (!confirmDelete) return;

//     try {
//       const res = await fetch(
//         `${API_BASE}/tests/deleteExecution/${id}`,
//         { method: "DELETE" }
//       );

//       if (res.ok) {
//         setMsg("Test case deleted successfully");
//         loadTests(); // refresh list & count
//       } else {
//         setMsg("Failed to delete test case");
//       }
//     } catch (err) {
//       setMsg("Error while deleting test case");
//     }
//   }

//   return (
//     <section className="card">

//       <h2>Create Test Case</h2>

//       {/* CREATE FORM */}
//       <form onSubmit={createTest}>
//         <input
//           placeholder="Test Name"
//           value={form.testName}
//           onChange={(e) => setForm({ ...form, testName: e.target.value })}
//           required
//         />

//         <select
//           value={form.testType}
//           onChange={(e) => setForm({ ...form, testType: e.target.value })}
//         >
//           <option value="API">API</option>
//           <option value="WEB">WEB</option>
//         </select>

//         <input
//           placeholder="Framework"
//           value={form.framework}
//           onChange={(e) => setForm({ ...form, framework: e.target.value })}
//         />

//         <input
//           placeholder="Endpoint (URL)"
//           value={form.endpoint}
//           onChange={(e) => setForm({ ...form, endpoint: e.target.value })}
//           required
//         />

//         <select
//           value={form.method}
//           onChange={(e) => setForm({ ...form, method: e.target.value })}
//         >
//           <option>GET</option>
//           <option>POST</option>
//           <option>PUT</option>
//           <option>DELETE</option>
//         </select>

//         <textarea
//           placeholder="Description"
//           value={form.description}
//           onChange={(e) => setForm({ ...form, description: e.target.value })}
//         />

//         <button>Create</button>
//       </form>

//       <p>{msg}</p>

//       {/* TOTAL TEST ALERT */}
//       {totalTests > 0 && (
//         <div className="alert alert-info">
//           🔔 Total Tests Created: {totalTests}
//         </div>
//       )}

//       {/* EXECUTION STATUS */}
//       {lastStatus && (
//         <h3>
//           Status:
//           <span
//             style={{
//               marginLeft: "10px",
//               color: lastStatus === "PASSED" ? "green" : "red"
//             }}
//           >
//             {lastStatus}
//           </span>
//         </h3>
//       )}

//       <h2>All Test Cases</h2>

//       {/* TEST LIST */}
//       <table className="table table-bordered">
//         <thead className="table-dark">
//           <tr>
//             <th>ID</th>
//             <th>Test Name</th>
//             <th>Type</th>
//             <th>Execute</th>
//             <th>Delete</th> {/* ⭐ NEW */}
//           </tr>
//         </thead>
//         <tbody>
//           {tests.map((t) => (
//             <tr key={t.id}>
//               <td>{t.id}</td>
//               <td>{t.testName}</td>
//               <td>{t.testType}</td>
//               <td>
//                 <button
//                   className="btn btn-success btn-sm"
//                   onClick={() => executeTest(t.id)}
//                 >
//                   Run
//                 </button>
//               </td>
//               <td>
//                 <button
//                   className="btn btn-danger btn-sm"
//                   onClick={() => deleteTest(t.id)}
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* ANALYTICS CHART */}
//       {showChart && <AnalyticsChart suiteId={1} />}

//     </section>
//   );
// }







































































import React, { useEffect, useState } from "react";
import { API_BASE } from "../config";
import AnalyticsChart from "./AnalyticsChart";

export default function TestCases() {

  const [tests, setTests] = useState([]);
  const [msg, setMsg] = useState("");
  const [lastStatus, setLastStatus] = useState(null);
  const [showChart, setShowChart] = useState(false);
  const [totalTests, setTotalTests] = useState(0);

  // ⭐ NEW: store execution id
  const [executionId, setExecutionId] = useState(null);

  const [form, setForm] = useState({
    testName: "",
    testType: "API",
    framework: "REST-Assured",
    endpoint: "",
    method: "GET",
    description: ""
  });

  // ---------------- LOAD TESTS ----------------
  useEffect(() => {
    loadTests();
  }, []);

  async function loadTests() {
    const res = await fetch(`${API_BASE}/tests`);
    const data = await res.json();
    setTests(data);
    setTotalTests(data.length);
  }

  // ---------------- CREATE TEST ----------------
  async function createTest(e) {
    e.preventDefault();
    setMsg("");

    await fetch(`${API_BASE}/tests/integrate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    setMsg("Test created successfully");
    setForm({
      testName: "",
      testType: "API",
      framework: "REST-Assured",
      endpoint: "",
      method: "GET",
      description: ""
    });

    loadTests();
  }

  // ---------------- EXECUTE TEST ----------------
  async function executeTest(id) {
    setMsg("Executing...");
    setShowChart(false);
    setExecutionId(null);

    const res = await fetch(`${API_BASE}/tests/${id}/execute`, {
      method: "POST"
    });

    const data = await res.json();

    // ⭐ IMPORTANT
    setExecutionId(data.id);      // execution id from backend
    setLastStatus(data.status);   // PASSED / FAILED
    setMsg(`Execution ${data.status}`);
    setShowChart(true);
  }

  // ---------------- DELETE TEST ----------------
  async function deleteTest(id) {
    if (!window.confirm("Are you sure you want to delete this test case?")) return;

    try {
      const res = await fetch(
        `${API_BASE}/tests/deleteExecution/${id}`,
        { method: "DELETE" }
      );

      if (res.ok) {
        setMsg("Test case deleted successfully");
        loadTests();
      } else {
        setMsg("Failed to delete test case");
      }
    } catch {
      setMsg("Error while deleting test case");
    }
  }

  return (
    <section className="card">

      <h2>Create Test Case</h2>

      {/* CREATE FORM */}
      <form onSubmit={createTest}>
        <input
          placeholder="Test Name"
          value={form.testName}
          onChange={(e) => setForm({ ...form, testName: e.target.value })}
          required
        />

        <select
          value={form.testType}
          onChange={(e) => setForm({ ...form, testType: e.target.value })}
        >
          <option value="API">API</option>
          <option value="WEB">WEB</option>
        </select>

        <input
          placeholder="Framework"
          value={form.framework}
          onChange={(e) => setForm({ ...form, framework: e.target.value })}
        />

        <input
          placeholder="Endpoint (URL)"
          value={form.endpoint}
          onChange={(e) => setForm({ ...form, endpoint: e.target.value })}
          required
        />

        <select
          value={form.method}
          onChange={(e) => setForm({ ...form, method: e.target.value })}
        >
          <option>GET</option>
          <option>POST</option>
          <option>PUT</option>
          <option>DELETE</option>
        </select>

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <button>Create</button>
      </form>

      <p>{msg}</p>

      {/* TOTAL TEST ALERT */}
      {totalTests > 0 && (
        <div className="alert alert-info">
          🔔 Total Tests Created: {totalTests}
        </div>
      )}

      {/* EXECUTION STATUS */}
      {lastStatus && (
        <h3>
          Status:
          <span
            style={{
              marginLeft: "10px",
              color: lastStatus === "PASSED" ? "green" : "red"
            }}
          >
            {lastStatus}
          </span>
        </h3>
      )}

      <h2>All Test Cases</h2>

      {/* TEST LIST */}
      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Test Name</th>
            <th>Type</th>
            <th>Execute</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {tests.map((t) => (
            <tr key={t.id}>
              <td>{t.id}</td>
              <td>{t.testName}</td>
              <td>{t.testType}</td>
              <td>
                <button
                  className="btn btn-success btn-sm"
                  onClick={() => executeTest(t.id)}
                >
                  Run
                </button>
              </td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteTest(t.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ⭐ ANALYTICS CHART FOR SINGLE EXECUTION */}
      {showChart && executionId && (
        <AnalyticsChart executionId={executionId} />
      )}

    </section>
  );
}
