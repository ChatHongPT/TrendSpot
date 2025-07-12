import React, { useState } from 'react';

export default function QueryCard({ sql }: { sql: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(sql);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const formatSQL = (sqlString: string) => {
    // Basic SQL formatting
    return sqlString
      .replace(/\b(SELECT|FROM|WHERE|JOIN|INNER JOIN|LEFT JOIN|RIGHT JOIN|ORDER BY|GROUP BY|HAVING|INSERT|UPDATE|DELETE|CREATE|ALTER|DROP)\b/gi, '\n$1')
      .replace(/,/g, ',\n  ')
      .replace(/\n\s*\n/g, '\n')
      .trim();
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 flex flex-col w-full h-full min-w-0 min-h-0 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mr-3">
            <span className="text-white text-lg">📝</span>
          </div>
          <div>
            <span className="font-bold text-lg text-gray-800">쿼리문</span>
            <p className="text-sm text-gray-500">SQL Query</p>
          </div>
        </div>
        
        <button
          onClick={handleCopy}
          className="flex items-center space-x-2 px-3 py-2 bg-gray-50 hover:bg-blue-50 rounded-lg transition-colors duration-200 group"
        >
          <svg className="w-4 h-4 text-gray-600 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          <span className="text-sm text-gray-600 group-hover:text-blue-600">
            {copied ? '복사됨!' : '복사'}
          </span>
        </button>
      </div>
      
      <div className="flex-1 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200">
        <pre className="text-sm text-gray-800 whitespace-pre-wrap overflow-x-auto font-mono leading-relaxed">
          {formatSQL(sql)}
        </pre>
      </div>
      
      <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
        <span>SQL 쿼리</span>
        <span>{sql.length} characters</span>
      </div>
    </div>
  );
}