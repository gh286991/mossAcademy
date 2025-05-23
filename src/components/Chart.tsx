import React from 'react';

interface ChartProps {
  color: string;
  year: number;
}

export const Chart: React.FC<ChartProps> = ({ color, year }) => {
  return (
    <div className="my-8 p-4 border rounded-lg">
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold">降雪量圖表</h3>
        <p className="text-gray-600">年份: {year}</p>
      </div>
      <div className="h-48 bg-gray-100 rounded-lg flex items-end justify-around p-4">
        {[30, 45, 60, 40, 35, 25].map((height, index) => (
          <div
            key={index}
            className="w-12 bg-blue-500 rounded-t"
            style={{
              height: `${height}%`,
              backgroundColor: color,
            }}
          />
        ))}
      </div>
    </div>
  );
}; 