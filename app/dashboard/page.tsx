'use client';

import { useState } from 'react';
import { salesData } from '../../data/mockSalesData';
import BarChartComponent from '../../components/BarChartComponent';
import LineChartComponent from '../../components/LineChartComponent';
import PieChartComponent from '../../components/PieChartComponent';
import FilterInput from '../../components/FilterInput';

export default function DashboardPage() {
  const [filteredData, setFilteredData] = useState(salesData);
  const [chartType, setChartType] = useState<'bar' | 'line' | 'pie'>('bar');

  const handleFilter = (threshold: number) => {
    setFilteredData(salesData.filter(item => item.sales >= threshold));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Sales Dashboard</h1>

      <FilterInput onFilter={handleFilter} />

      <div className="flex gap-4 mb-4">
        <button onClick={() => setChartType('bar')} className="px-4 py-2 bg-blue-500 text-white rounded">Bar</button>
        <button onClick={() => setChartType('line')} className="px-4 py-2 bg-green-500 text-white rounded">Line</button>
        <button onClick={() => setChartType('pie')} className="px-4 py-2 bg-yellow-500 text-white rounded">Pie</button>
      </div>

      {chartType === 'bar' && <BarChartComponent data={filteredData} />}
      {chartType === 'line' && <LineChartComponent data={filteredData} />}
      {chartType === 'pie' && <PieChartComponent data={filteredData} />}
    </div>
  );
}
