// import React, { useState } from "react";
// import { API_BASE } from "../config";

// export default function Notifications() {
//   const [to, setTo] = useState("");
//   const [subject, setSubject] = useState("");
//   const [message, setMessage] = useState("");
//   const [resp, setResp] = useState("");

//   async function sendMail() {
//     const res = await fetch(`${API_BASE}/notifications/send`, {
//       method:"POST",
//       headers:{"Content-Type":"application/json"},
//       body: JSON.stringify({ to, subject, message })
//     });

//     setResp(await res.text());
//   }

//   return (
//     <section className="card">
//       <h2>Notifications</h2>

//       <input placeholder="To Email" value={to} onChange={(e)=>setTo(e.target.value)} />
//       <input placeholder="Subject" value={subject} onChange={(e)=>setSubject(e.target.value)} />
//       <textarea placeholder="Message" value={message} onChange={(e)=>setMessage(e.target.value)}></textarea>

//       <button onClick={sendMail}>Send Mail</button>

//       <pre>{resp}</pre>
//     </section>
//   );
// }


import React, { useState } from "react";
import { API_BASE } from "../config";

export default function Notifications() {

  const [form, setForm] = useState({
    to: "",
    subject: "",
    message: ""
  });

  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMail(e) {
    e.preventDefault();
    setLoading(true);
    setResponse("");

    try {
      const res = await fetch(`${API_BASE}/notifications/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const text = await res.text();
      setResponse(text || "Notification sent successfully");
    } catch (err) {
      setResponse("Failed to send notification");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="card">

      <h2>Email Notifications</h2>

      {/* FORM */}
      <form onSubmit={sendMail}>
        <input
          type="email"
          placeholder="To Email"
          value={form.to}
          onChange={(e) => setForm({ ...form, to: e.target.value })}
          required
        />

        <input
          placeholder="Subject"
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
          required
        />

        <textarea
          placeholder="Message"
          rows="4"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          required
        />

        <button disabled={loading}>
          {loading ? "Sending..." : "Send Mail"}
        </button>
      </form>

      {response && <p className="mt-2">{response}</p>}

      {/* TABULAR VIEW */}
      <h3 className="mt-4">Notification Payload</h3>

      <table className="table table-bordered mt-2">
        <thead>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>To</td>
            <td>{form.to || "-"}</td>
          </tr>
          <tr>
            <td>Subject</td>
            <td>{form.subject || "-"}</td>
          </tr>
          <tr>
            <td>Message</td>
            <td>{form.message || "-"}</td>
          </tr>
        </tbody>
      </table>

    </section>
  );
}
