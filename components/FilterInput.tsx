'use client';

import { useState } from 'react';

interface Props {
  onFilter: (threshold: number) => void;
}

export default function FilterInput({ onFilter }: Props) {
  const [value, setValue] = useState('');

  return (
    <div className="mb-4">
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Sales threshold"
        className="border p-2 mr-2 rounded"
      />
      <button onClick={() => onFilter(Number(value))} className="bg-blue-600 text-white px-4 py-2 rounded">
        Filter
      </button>
    </div>
  );
}

