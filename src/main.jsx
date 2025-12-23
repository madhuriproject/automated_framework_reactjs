
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import TestCases from "./pages/TestCases";
import TestExecution from "./execution/TestExecution";
import Schedule from "./pages/Schedule";
import Reports from "./pages/Reports";
import Analytics from "./pages/Analytics";
import Logs from "./pages/Logs";
import Notifications from "./pages/Notifications";

import "./styles.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <header className="header">
          <h1>Automated Regression Framework</h1>

          <nav>
            <Link to="/">Tests</Link>
            <Link to="/executions">Executions</Link>
            <Link to="/schedule">Schedule</Link>
            <Link to="/reports">Reports</Link>
            <Link to="/analytics">Analytics</Link>
            <Link to="/logs">Logs</Link>
            <Link to="/notifications">Notifications</Link>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<TestCases />} />
            <Route path="/executions" element={<TestExecution />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/logs" element={<Logs />} />
            <Route path="/notifications" element={<Notifications />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

createRoot(document.getElementById("root")).render(<App />);
