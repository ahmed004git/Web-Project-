import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";

import AdminDashboard from "./pages/AdminDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import Students from "./pages/Students";
import Attendance from "./pages/Attendance";
import Marks from "./pages/Marks";

function App() {
return (
    <BrowserRouter>
      <AuthProvider>
        <div className="App">
          <Navbar />
          <div style={{ display: "flex" }}>
            <Sidebar />
            <main style={{ flex: 1, padding: "1rem" }}>
              <Routes>
                <Route path="/login" element={<Login />} />
                
                {/* Admin Routes */}
                <Route path="/admin" element={
                  <ProtectedRoute role="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/students" element={
                  <ProtectedRoute role="admin">
                    <Students />
                  </ProtectedRoute>
                } />
                <Route path="/attendance" element={
                  <ProtectedRoute role="admin">
                    <Attendance />
                  </ProtectedRoute>
                } />
                <Route path="/marks" element={
                  <ProtectedRoute role="admin">
                    <Marks />
                  </ProtectedRoute>
                } />

                <Route path="/student" element={
                  <ProtectedRoute role="student">
                    <StudentDashboard />
                  </ProtectedRoute>
                } />

                <Route path="/" element={<Login />} />
              </Routes>
            </main>
          </div>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
