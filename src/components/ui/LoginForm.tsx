import React, { useState } from 'react';

interface LoginFormProps {
  onLogin: () => void;
}

export default function LoginForm({ onLogin }: LoginFormProps) {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (id === 'fisa' && pw === 'fisa') {
      setError('');
      onLogin();
    } else {
      setError('아이디 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-blue-200 animate-fadein">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-sm flex flex-col gap-6 border border-blue-100 transition-all duration-300 hover:shadow-blue-200"
      >
        <div className="flex flex-col items-center mb-2">
          <img src="/logo.png" alt="TrendSpot 로고" className="w-16 h-16 mb-2 rounded-full shadow" />
          <div className="text-2xl font-extrabold text-blue-700 tracking-tight select-none">TrendSpot</div>
          <div className="text-sm text-gray-700 font-medium mt-1">소상공인 창업 인사이트 플랫폼</div>
        </div>
        <input
          type="text"
          placeholder="아이디"
          value={id}
          onChange={e => setId(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition placeholder-gray-400 hover:border-blue-400"
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={pw}
          onChange={e => setPw(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition placeholder-gray-400 hover:border-blue-400"
        />
        {error && <div className="text-red-500 text-sm text-center animate-shake">{error}</div>}
        <button
          type="submit"
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded py-2 font-semibold shadow hover:from-blue-600 hover:to-purple-600 hover:scale-105 active:scale-95 transition-all duration-200"
        >
          로그인
        </button>
      </form>
      <style>{`
        @keyframes fadein { from { opacity: 0; } to { opacity: 1; } }
        .animate-fadein { animation: fadein 0.7s; }
        @keyframes shake { 10%, 90% { transform: translateX(-2px); } 20%, 80% { transform: translateX(4px); } 30%, 50%, 70% { transform: translateX(-8px); } 40%, 60% { transform: translateX(8px); } }
        .animate-shake { animation: shake 0.4s; }
      `}</style>
    </div>
  );
} 