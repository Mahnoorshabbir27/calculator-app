import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-device text-lcd px-6 py-4 flex items-center justify-between border-b-4 border-amber">
      <Link to="/" className="flex items-center gap-2 group">
        <span className="font-mono text-xs px-1.5 py-1 bg-amber text-ink rounded-sm font-bold group-hover:bg-lcd transition-colors">
         Master
        </span>
        <span className="font-display font-bold tracking-tight text-lg text-lcd">
        Calculator
        </span>
      </Link>
      <div className="flex items-center gap-4 text-sm font-mono">
        {user ? (
          <>
            <span className="text-device-light hidden sm:inline text-lcd/70">
             {user.name}
            </span>
            <button
              onClick={handleLogout}
              className="bg-danger hover:bg-danger/80 text-white px-3 py-1.5 rounded-sm transition-colors font-medium tracking-tight"
            >
              LOGOUT
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="px-3 py-1.5 rounded-sm hover:bg-device-light transition-colors"
            >
              LOGIN
            </Link>
            <Link
              to="/register"
              className="bg-amber text-ink px-3 py-1.5 rounded-sm hover:bg-lcd transition-colors font-medium"
            >
              SIGN UP
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
