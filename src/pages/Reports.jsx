// import React, { useState } from "react";
// import { API_BASE } from "../config";

// export default function Reports() {
//   const [msg, setMsg] = useState("");

//   async function genHtml() {
//     const res = await fetch(`${API_BASE}/reports/generate/html`);
//     setMsg(await res.text());
//   }

//   async function genCsv() {
//     const res = await fetch(`${API_BASE}/reports/generate/csv`);
//     setMsg(await res.text());
//   }

//   return (
//     <section className="card">
//       <h2>Reports</h2>

//       <button onClick={genHtml}>Generate HTML</button>
//       <button onClick={genCsv}>Generate CSV</button>

//       <pre>{msg}</pre>
//     </section>
//   );
// }


// import React, { useState } from "react";
// import { API_BASE } from "../config";

// export default function Reports() {

//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState("");

//   async function generate(type) {
//     setLoading(type);
//     setMessage("");

//     try {
//       const res = await fetch(`${API_BASE}/reports/generate/${type}`);
//       const text = await res.text();
//       setMessage(text);
//     } catch (err) {
//       setMessage("Failed to generate report");
//     } finally {
//       setLoading("");
//     }
//   }

//   return (
//     <section className="card">

//       <h2>Report Generation</h2>

//       {/* REPORT TABLE */}
//       <table className="table table-bordered mt-3">
//         <thead>
//           <tr>
//             <th>Report Type</th>
//             <th>Description</th>
//             <th>Action</th>
//           </tr>
//         </thead>

//         <tbody>
//           <tr>
//             <td>HTML Report</td>
//             <td>Detailed execution summary in browser format</td>
//             <td>
//               <button
//                 onClick={() => generate("html")}
//                 disabled={loading === "html"}
//               >
//                 {loading === "html" ? "Generating..." : "Generate HTML"}
//               </button>
//             </td>
//           </tr>

//           <tr>
//             <td>CSV Report</td>
//             <td>Export execution results for Excel analysis</td>
//             <td>
//               <button
//                 onClick={() => generate("csv")}
//                 disabled={loading === "csv"}
//               >
//                 {loading === "csv" ? "Generating..." : "Generate CSV"}
//               </button>
//             </td>
//           </tr>
//         </tbody>
//       </table>

//       {/* RESPONSE */}
//       {message && (
//         <div className="alert alert-info mt-3">
//           {message}
//         </div>
//       )}

//     </section>
//   );
// }








import React from "react";
import { API_BASE } from "../config";

export default function Reports() {

  function download(type) {
    window.open(`${API_BASE}/reports/generate/${type}`);
  }

  return (
    <section className="card">

      <h2 className="page-title">Report Generation</h2>

      <table className="table table-bordered table-striped mt-3 report-table">
        <thead className="table-dark">
          <tr>
            <th style={{ width: "25%" }}>Report Type</th>
            <th style={{ width: "50%" }}>Description</th>
            <th style={{ width: "25%" }} className="text-center">Download</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td><strong>HTML Report</strong></td>
            <td>
              Browser-viewable execution report with test details,
              status, and timestamps.
            </td>
            <td className="text-center">
              <button
                className="btn btn-primary btn-sm"
                onClick={() => download("html")}
              >
                Generate HTML
              </button>
            </td>
          </tr>

          <tr>
            <td><strong>CSV Report</strong></td>
            <td>
              Download execution data in CSV format for
              Excel and offline analysis.
            </td>
            <td className="text-center">
              <button
                className="btn btn-success btn-sm"
                onClick={() => download("csv")}
              >
                Generate CSV
              </button>
            </td>
          </tr>
        </tbody>
      </table>

    </section>
  );
}







