import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/auth';
import { API_URL } from '../config';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ username, password })
      });

      if (response.ok) {
        const data = await response.json();
        authService.setToken(data.access_token);
        navigate('/dashboard');
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cyber-darker text-white">
      <div className="glass-panel p-8 w-96 flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-cyber-blue text-center drop-shadow-[0_0_10px_rgba(0,240,255,0.8)]">
          CYBERSHIELD AI
        </h2>
        <h3 className="text-gray-400 text-center mb-4">SOC Authentication</h3>
        
        {error && <div className="text-cyber-red text-sm text-center">{error}</div>}
        
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-black/50 border border-white/20 rounded p-2 text-white focus:outline-none focus:border-cyber-blue"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-black/50 border border-white/20 rounded p-2 text-white focus:outline-none focus:border-cyber-blue"
            required
          />
          <button type="submit" className="bg-cyber-blue/20 border border-cyber-blue text-cyber-blue rounded p-2 hover:bg-cyber-blue/40 transition-colors">
            ACCESS SYSTEM
          </button>
        </form>
        
        <div className="text-center text-sm text-gray-500 mt-2">
          New Analyst? <Link to="/signup" className="text-cyber-green hover:underline">Register clearance</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
