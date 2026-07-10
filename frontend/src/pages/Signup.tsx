import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/auth';
import { API_URL } from '../config';

const Signup: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
      });

      if (response.ok) {
        const data = await response.json();
        authService.setToken(data.access_token);
        navigate('/dashboard');
      } else {
        const data = await response.json();
        setError(data.detail || 'Registration failed');
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
        <h3 className="text-gray-400 text-center mb-4">Request Clearance</h3>
        
        {error && <div className="text-cyber-red text-sm text-center">{error}</div>}
        
        <form onSubmit={handleSignup} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-black/50 border border-white/20 rounded p-2 text-white focus:outline-none focus:border-cyber-blue"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          <button type="submit" className="bg-cyber-green/20 border border-cyber-green text-cyber-green rounded p-2 hover:bg-cyber-green/40 transition-colors">
            REGISTER
          </button>
        </form>
        
        <div className="text-center text-sm text-gray-500 mt-2">
          Already have clearance? <Link to="/login" className="text-cyber-blue hover:underline">Authenticate</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
