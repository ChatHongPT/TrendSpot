import React, { useState } from 'react';

interface LayoutProps {
  children: React.ReactNode;
  onLogout?: () => void;
}

export default function Layout({ children, onLogout }: LayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex flex-col">
      <header className="fixed top-0 left-0 w-full z-50 bg-white shadow p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img src="/logo.png" alt="TrendSpot 로고" className="w-8 h-8 rounded-full shadow" />
          <span className="text-2xl font-bold text-blue-600">TrendSpot</span>
        </div>
        <div className="flex items-center space-x-2 ml-4 relative">
          <img src="/avatar.png" alt="profile" className="w-8 h-8 rounded-full border" />
          <span className="text-gray-700 font-semibold">김우리님 안녕하세요</span>
          <button
            className="ml-2 p-2 rounded hover:bg-gray-100 focus:outline-none"
            onClick={() => setMenuOpen(v => !v)}
            aria-label="메뉴 열기"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-12 bg-white border rounded shadow-lg py-2 w-32 z-50">
              <button
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-500 transition-colors duration-200"
                onClick={() => { setMenuOpen(false); onLogout && onLogout(); }}
              >
                로그아웃
              </button>
            </div>
          )}
        </div>
      </header>
      <main className="w-full min-h-[calc(100vh-64px)] flex flex-col items-center justify-center px-2 md:px-8 flex-1 pt-20">
        <div className="w-full max-w-screen-2xl">
          {children}
        </div>
      </main>
      <div className="fixed bottom-4 right-4 flex items-center bg-white/80 rounded-full shadow-lg px-3 py-1 z-50 border border-blue-100 backdrop-blur-sm">
        <img src="/woori.png" alt="TrendCore 로고" className="w-6 h-6 mr-2" />
        <span className="text-gray-500 font-semibold text-xs tracking-wide">TrendCore</span>
      </div>
    </div>
  );
}