import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import QueryCard from '../ui/QueryCard';
import ChartCard from '../ui/ChartCard';

const files = [
  { sql: '/sql/q1.sql', csv: '/data/q1.csv', label: 'Q1' },
  { sql: '/sql/q2.sql', csv: '/data/q2.csv', label: 'Q2' },
  { sql: '/sql/q3.sql', csv: '/data/q3.csv', label: 'Q3' },
  { sql: '/sql/q4.sql', csv: '/data/q4.csv', label: 'Q4' },
];

const questions = [
  "3월 한 달 매출만 보면 카페가 잘 될까?",
  "3월에 어떤 업종이 제일 잘 팔렸을까?",
  "2~4월까지 누적으로 보면 어느 업종이 더 탄탄하지?",
  "분기 단위로 분석하면 내가 진입할 시점을 잡을 수 있을까?"
];

export default function Dashboard() {
  const [selected, setSelected] = useState(0);
  const [sql, setSql] = useState('');
  const [data, setData] = useState<any[]>([]);
  const [keys, setKeys] = useState<string[]>([]);

  useEffect(() => {
    fetch(files[selected].sql)
      .then(res => res.text())
      .then(setSql);

    fetch(files[selected].csv)
      .then(res => res.text())
      .then(text => {
        const parsed = Papa.parse(text, { header: true });
        setData(parsed.data);
        setKeys(parsed.meta.fields || []);
      });
  }, [selected]);

  return (
    <div className="min-h-screen w-full h-full">
      <div className="flex gap-3 mb-8 mt-8">
        {files.map((f, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className={`px-6 py-2 rounded-full font-semibold shadow transition-all duration-200
              ${selected === i
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white scale-105'
                : 'bg-white text-gray-700 hover:bg-blue-100'}`}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className="mb-8 flex justify-center">
        <div className="bg-white/80 rounded-xl shadow px-6 py-4 flex items-center gap-2 max-w-2xl w-full border border-blue-100">
          <span className="text-3xl text-blue-400 select-none">“</span>
          <span className="text-lg md:text-xl font-semibold text-blue-700 text-center flex-1">{questions[selected]}</span>
          <span className="text-3xl text-blue-400 select-none">”</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full min-w-0 h-full items-stretch">
        <div className="w-full min-w-0 h-full"><QueryCard sql={sql} /></div>
        <div className="w-full min-w-0 h-full"><ChartCard data={data} keys={keys} /></div>
      </div>
    </div>
  );
}