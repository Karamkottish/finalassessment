'use client';

import { useState } from 'react';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend
} from 'recharts';

const salesData = [
  { year: '2020', sales: 4500 },
  { year: '2021', sales: 6200 },
  { year: '2022', sales: 7300 },
];

const COLORS = ['#3b82f6', '#10b981', '#facc15'];

export default function SalesDashboard() {
  const [threshold, setThreshold] = useState<number>(-1);
  const [chartType, setChartType] = useState<'bar' | 'line' | 'pie'>('bar');

  const filteredData = threshold > 0
    ? salesData.filter((d) => d.sales >= threshold)
    : salesData;

  const renderChart = () => {
    if (filteredData.length === 0) {
      return <p className="text-center text-red-500 mt-8">No data matches the threshold.</p>;
    }

    switch (chartType) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        );
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#10b981" />
            </LineChart>
          </ResponsiveContainer>
        );
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Tooltip />
              <Legend />
              <Pie
                data={filteredData}
                dataKey="sales"
                nameKey="year"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {filteredData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-8 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-gray-700">Sales Dashboard</h1>

      <div className="flex items-center gap-4 mb-4 flex-wrap">
        <input
          type="number"
          placeholder="Enter sales threshold"
          className="border border-gray-300 p-2 rounded text-black"
          value={threshold}
          onChange={(e) => setThreshold(Number(e.target.value))}
        />
        <button
          onClick={() => setThreshold(threshold)} // redundant but keeps behavior consistent
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Filter
        </button>
        <button
          onClick={() => setThreshold(-1)}
          className="bg-gray-400 text-black px-4 py-2 rounded"
        >
          Reset
        </button>
      </div>

      <div className="flex gap-3 mb-4 flex-wrap">
        <button
          onClick={() => setChartType('bar')}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Bar
        </button>
        <button
          onClick={() => setChartType('line')}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Line
        </button>
        <button
          onClick={() => setChartType('pie')}
          className="bg-yellow-400 text-white px-4 py-2 rounded"
        >
          Pie
        </button>
      </div>

      <div className="bg-white p-4 rounded shadow">
        {renderChart()}
      </div>
    </div>
  );
}
