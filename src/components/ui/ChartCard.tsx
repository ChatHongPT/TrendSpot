import React, { useState } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid, BarChart, Bar } from 'recharts';

interface ChartCardProps {
  data: any[];
  keys: string[];
}

// 숫자 단위 포맷 함수
export function formatNumber(value: number): string {
  if (value >= 1_000_000_000) return (value / 1_000_000_000).toFixed(2) + 'B';
  if (value >= 1_000_000) return (value / 1_000_000).toFixed(2) + 'M';
  if (value >= 1_000) return (value / 1_000).toFixed(2) + 'K';
  return value.toLocaleString();
}

function numberWithCommas(x: any) {
  if (x === undefined || x === null || isNaN(Number(x))) return x;
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function ChartCard({ data, keys }: ChartCardProps) {
  const [chartType, setChartType] = useState<'line' | 'bar'>('line');
  const isSingleValue = keys.length === 2; // [x, y]
  
  const colors = [
    '#8B5CF6', '#06D6A0', '#F59E0B', '#EF4444', '#3B82F6', 
    '#10B981', '#F97316', '#8B5A2B', '#EC4899', '#6366F1'
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3">
          <p className="font-medium text-gray-800 mb-2">{`${keys[0]}: ${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {`${entry.dataKey}: ${formatNumber(entry.value)}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 flex flex-col w-full h-full min-w-0 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mr-3">
            <span className="text-white text-lg">📊</span>
          </div>
          <div>
            <span className="font-bold text-lg text-gray-800">데이터 시각화</span>
            <p className="text-sm text-gray-500">Interactive Dashboard</p>
          </div>
        </div>
        
        {data.length > 0 && keys.length > 1 && (
          <div className="flex items-center space-x-2 bg-gray-50 rounded-lg p-1">
            <button
              onClick={() => setChartType('line')}
              className={`px-3 py-1 rounded-md text-sm transition-colors duration-200 ${
                chartType === 'line' 
                  ? 'bg-white shadow-sm text-purple-600 font-medium' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              📈 Line
            </button>
            <button
              onClick={() => setChartType('bar')}
              className={`px-3 py-1 rounded-md text-sm transition-colors duration-200 ${
                chartType === 'bar' 
                  ? 'bg-white shadow-sm text-purple-600 font-medium' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              📊 Bar
            </button>
          </div>
        )}
      </div>
      
      {data.length > 0 && keys.length > 1 ? (
        <div className="flex-1 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200">
          <ResponsiveContainer width="100%" height={340}>
            {chartType === 'bar' ? (
              <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis 
                  dataKey={keys[0]} 
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                  axisLine={{ stroke: '#D1D5DB' }}
                />
                <YAxis 
                  tickFormatter={formatNumber} 
                  width={70}
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                  axisLine={{ stroke: '#D1D5DB' }}
                />
                <Tooltip formatter={formatNumber} content={<CustomTooltip />} />
                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                {keys.slice(1).map((k, idx) => (
                  <Bar 
                    key={k} 
                    dataKey={k} 
                    fill={colors[idx % colors.length]}
                    radius={[4, 4, 0, 0]}
                  />
                ))}
              </BarChart>
            ) : (
              <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis 
                  dataKey={keys[0]} 
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                  axisLine={{ stroke: '#D1D5DB' }}
                />
                <YAxis 
                  tickFormatter={formatNumber} 
                  width={70}
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                  axisLine={{ stroke: '#D1D5DB' }}
                />
                <Tooltip formatter={formatNumber} content={<CustomTooltip />} />
                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                {keys.slice(1).map((k, idx) => (
                  <Line 
                    key={k} 
                    type="monotone" 
                    dataKey={k} 
                    stroke={colors[idx % colors.length]}
                    strokeWidth={3}
                    dot={{ fill: colors[idx % colors.length], strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: colors[idx % colors.length], strokeWidth: 2, fill: '#fff' }}
                  />
                ))}
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="flex-1 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center p-8">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl text-gray-400">📊</span>
          </div>
          <p className="text-gray-500 text-center mb-2 font-medium">데이터가 없습니다</p>
          <p className="text-gray-400 text-sm text-center">CSV 파일을 업로드하거나 쿼리를 실행해주세요</p>
        </div>
      )}
      
      {data.length > 0 && keys.length > 1 && (
        <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
          <span>{data.length}개 데이터 포인트</span>
          <span>{keys.length - 1}개 시리즈</span>
        </div>
      )}
    </div>
  );
}