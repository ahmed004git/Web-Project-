import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div
      style={{
        width: "200px",
        background: "#f0f0f0",
        minHeight: "100vh",
        padding: "1rem",
      }}
    >
      <h3>Menu</h3>

      <ul style={{ listStyle: "none", padding: 0 }}>
        <li><Link to="/admin">Dashboard</Link></li>
        <li><Link to="/students">Students</Link></li>
        <li><Link to="/attendance">Attendance</Link></li>
        <li><Link to="/marks">Marks</Link></li>
      </ul>
    </div>
  );
}