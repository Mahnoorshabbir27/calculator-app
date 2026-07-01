import React, { useEffect, useMemo, useState } from 'react';
import api from '../api/axios';

const OPERATORS = [
  { symbol: '+', label: 'Add' },
  { symbol: '-', label: 'Sub' },
  { symbol: '*', label: 'Mul' },
  { symbol: '/', label: 'Div' },
];

export default function Calculator() {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [operator, setOperator] = useState('+');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [historyLoaded, setHistoryLoaded] = useState(false);

  const loadHistory = async () => {
    try {
      const { data } = await api.get('/calculator/history');
      setHistory(data);
    } catch (err) {
      // silently ignore on initial load
    } finally {
      setHistoryLoaded(true);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const previewExpression = useMemo(() => {
    const valA = a === '' ? '_' : a;
    const valB = b === '' ? '_' : b;
    return `${valA} ${operator} ${valB}`;
  }, [a, b, operator]);

  const handleCalculate = async (e) => {
    e.preventDefault();
    setError('');
    setResult(null);

    if (a === '' || b === '') {
      setError('Both values are required');
      return;
    }

    setLoading(true);
    try {
      const { data } = await api.post('/calculator/calculate', {
        a,
        b,
        operator,
      });
      setResult(data.result);
      setHistory((prev) => [data, ...prev]);
    } catch (err) {
      setError(err.response?.data?.message || 'Calculation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-10">
      {/* Calculator device */}
      <div className="bg-device rounded-3xl shadow-2xl p-4">
        {/* LCD display */}
        <div className="lcd-screen rounded-xl px-5 py-6 mb-4">
          <p className="font-mono text-[11px] tracking-widest text-ink/55 uppercase">
            expression
          </p>
          <p className="font-mono text-lg text-ink/80 tabular mt-1 truncate">
            {previewExpression}
          </p>
          <div className="mt-3 pt-3 border-t border-ink/15 flex items-baseline justify-between">
            <span className="font-mono text-[11px] tracking-widest text-ink/55 uppercase">
              {error ? 'error' : 'result'}
            </span>
            <span
              className={`font-mono text-3xl tabular font-semibold ${
                error ? 'text-danger' : 'text-ink'
              }`}
            >
              {error ? 'ERR' : result !== null ? result : '0'}
            </span>
          </div>
          {error && (
            <p className="font-mono text-[11px] text-danger mt-1">{error}</p>
          )}
        </div>

        {/* Keypad-style form */}
        <form onSubmit={handleCalculate} className="space-y-3 px-1">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-lcd/70 mb-1">
                Value A
              </label>
              <input
                type="text"
                inputMode="decimal"
                value={a}
                onChange={(e) => setA(e.target.value)}
                className="w-full bg-device-light text-lcd placeholder-lcd/30 rounded-md px-3 py-2.5 font-mono text-sm focus-amber tabular"
                placeholder="10"
              />
            </div>
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-lcd/70 mb-1">
                Value B
              </label>
              <input
                type="text"
                inputMode="decimal"
                value={b}
                onChange={(e) => setB(e.target.value)}
                className="w-full bg-device-light text-lcd placeholder-lcd/30 rounded-md px-3 py-2.5 font-mono text-sm focus-amber tabular"
                placeholder="5"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-lcd/70 mb-1">
              Operator
            </label>
            <div className="grid grid-cols-4 gap-2">
              {OPERATORS.map((op) => (
                <button
                  type="button"
                  key={op.symbol}
                  onClick={() => setOperator(op.symbol)}
                  className={`py-2.5 rounded-md font-mono text-lg font-semibold transition-colors ${
                    operator === op.symbol
                      ? 'bg-amber text-ink'
                      : 'bg-device-light text-lcd hover:bg-teal/40'
                  }`}
                  title={op.label}
                >
                  {op.symbol}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal hover:bg-lcd hover:text-ink text-white py-3 rounded-md font-display font-bold tracking-tight transition-colors disabled:opacity-50"
          >
            {loading ? 'CALCULATING…' : 'CALCULATE '}
          </button>
        </form>
      </div>

      {/* Receipt-tape history */}
      <div className="mt-8">
        <div className="tape-edge rounded-t-sm" />
        <div className="bg-white shadow-md px-5 py-4">
          <p className="font-mono text-[11px] tracking-widest text-ink/50 uppercase mb-3">
            history tape
          </p>
          {!historyLoaded ? (
            <p className="font-mono text-xs text-ink/40">loading…</p>
          ) : history.length === 0 ? (
            <p className="font-mono text-xs text-ink/40">
              nothing printed yet — run a calculation above.
            </p>
          ) : (
            <ul className="font-mono text-sm divide-y divide-dashed divide-ink/15">
              {history.map((item, idx) => (
                <li
                  key={item.id || idx}
                  className="py-2 flex items-center justify-between gap-3 tabular"
                >
                  <span className="text-ink/60 truncate">{item.expression}</span>
                  <span className="font-semibold text-ink shrink-0">
                    = {item.result}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="tape-edge rounded-b-sm rotate-180" />
      </div>
    </div>
  );
}
