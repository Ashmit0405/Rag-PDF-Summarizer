import { useState, useContext } from 'react'
import Signup from './pages/Signup.jsx'
import './App.css'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { AuthContext } from './context/authContext.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'

function ProtectedRoute({ children }) {
  const { user, loading } = useContext(AuthContext);
  if (!user) return <Navigate to="/login" replace />;
  if (loading) return <p>Loading...</p>;
  return children;
}

function PublicRoute({ children }) {
  const { user, loading } = useContext(AuthContext);
  if (user) {
    return <Navigate to="/" replace />;
  }
  return children;
}


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />
        {/* <Route path="/auth/success" element={<AuthSuccess />} />
          <Route path="/index.html" element={<AuthSuccess/>} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
