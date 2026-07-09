import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Landing from './pages/Landing';
import { authService } from './services/auth';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  if (!authService.isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <div className="min-h-screen bg-cyber-darker text-white overflow-hidden">
                <header className="absolute top-0 w-full z-10 glass-panel border-b border-white/10 p-4">
                  <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold tracking-widest text-cyber-blue drop-shadow-[0_0_10px_rgba(0,240,255,0.8)]">
                      CYBERSHIELD AI
                    </h1>
                    <div className="flex space-x-4 text-sm font-mono text-gray-400 items-center">
                      <span>SOC DASHBOARD</span>
                      <span className="text-cyber-green animate-pulse">● LIVE</span>
                      <button 
                        onClick={() => {
                          authService.removeToken();
                          window.location.href = '/login';
                        }}
                        className="ml-4 text-xs bg-red-500/20 text-red-500 border border-red-500 rounded px-2 py-1 hover:bg-red-500/40"
                      >
                        LOGOUT
                      </button>
                    </div>
                  </div>
                </header>
                <main className="pt-20 h-screen w-full">
                  <Dashboard />
                </main>
              </div>
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
