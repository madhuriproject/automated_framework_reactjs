import React, { useState } from "react";
import { API_BASE } from "../config";

export default function Notifications() {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [resp, setResp] = useState("");

  async function sendMail() {
    const res = await fetch(`${API_BASE}/notifications/send`, {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify({ to, subject, message })
    });

    setResp(await res.text());
  }

  return (
    <section className="card">
      <h2>Notifications</h2>

      <input placeholder="To Email" value={to} onChange={(e)=>setTo(e.target.value)} />
      <input placeholder="Subject" value={subject} onChange={(e)=>setSubject(e.target.value)} />
      <textarea placeholder="Message" value={message} onChange={(e)=>setMessage(e.target.value)}></textarea>

      <button onClick={sendMail}>Send Mail</button>

      <pre>{resp}</pre>
    </section>
  );
}
