'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function LineChartComponent({ data }: { data: { year: string; sales: number }[] }) {
  return (
    <div className="bg-white p-4 rounded shadow-md w-full h-[350px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="sales" stroke="#16a34a" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
