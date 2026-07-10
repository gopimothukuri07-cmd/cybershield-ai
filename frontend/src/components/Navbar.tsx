import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { authService } from '../services/auth';

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { label: 'MAP', path: '/dashboard' },
    { label: 'STATISTICS', path: '/statistics' },
    { label: 'THREAT FEED', path: '/threats' },
  ];

  const handleLogout = () => {
    authService.removeToken();
    navigate('/login');
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-3 bg-black/80 backdrop-blur-md border-b border-white/10">
      {/* Logo */}
      <div className="flex items-center gap-8">
        <span className="text-xl font-black tracking-widest text-cyber-blue drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]">
          CYBERSHIELD AI
        </span>

        {/* Nav Links */}
        <div className="flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-4 py-1.5 text-xs font-mono tracking-widest transition-all rounded ${
                location.pathname === item.path
                  ? 'text-cyber-blue border-b-2 border-cyber-blue bg-cyber-blue/10'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4 text-xs font-mono">
        <span className="flex items-center gap-1.5 text-gray-400">
          <span className="w-2 h-2 rounded-full bg-cyber-green animate-pulse inline-block"></span>
          LIVE
        </span>
        <button
          onClick={handleLogout}
          className="px-4 py-1.5 bg-red-500/20 text-red-400 border border-red-500/40 rounded hover:bg-red-500/40 transition-all tracking-widest"
        >
          LOGOUT
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
