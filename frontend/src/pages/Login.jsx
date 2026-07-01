import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-sm bg-device rounded-2xl shadow-2xl p-3">
        {/* LCD readout */}
        <div className="lcd-screen rounded-lg px-5 py-5 mb-4">
          <p className="font-mono text-[11px] tracking-widest text-ink/60 uppercase">
            session // sign in
          </p>
          <p className="font-mono text-2xl text-ink mt-1 tabular">
            {error ? 'ERR' : 'READY'}
          </p>
          {error && (
            <p className="font-mono text-xs text-ink/80 mt-1">{error}</p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="px-2 pb-3 space-y-3">
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-lcd/70 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full bg-device-light text-lcd placeholder-lcd/30 rounded-md px-3 py-2.5 font-mono text-sm focus-amber"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-lcd/70 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              value={form.password}
              onChange={handleChange}
              className="w-full bg-device-light text-lcd placeholder-lcd/30 rounded-md px-3 py-2.5 font-mono text-sm focus-amber"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber hover:bg-lcd text-ink py-2.5 rounded-md font-display font-bold tracking-tight transition-colors disabled:opacity-50"
          >
            {loading ? 'CHECKING…' : 'LOGIN ='}
          </button>
          <p className="text-xs text-center text-lcd/50 font-mono pt-1">
          New here? Create an account{' '}
            <Link to="/register" className="text-amber hover:underline">
              register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
