import { useState, useContext } from 'react'
import Signup from './pages/Signup.jsx'
import './App.css'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { AuthContext } from './context/authContext.jsx'
import Home from './pages/Home.jsx'

function ProtectedRoute({ children }) {
  const { user, loading } = useContext(AuthContext);
  if (!user) return <Navigate to="/signup" replace />;
  if (loading) return <p>Loading...</p>;
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
              <Home/>
            </ProtectedRoute>
          }
        />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
