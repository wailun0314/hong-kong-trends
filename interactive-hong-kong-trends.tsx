import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

const data = [
  { year: 2011, elderlyPopulation: 13.3, healthcareCost: 79.8, lifeExpectancy: 83.4, chronicDiseaseRate: 28.2, insurancePenetration: 12.3 },
  { year: 2016, elderlyPopulation: 16.6, healthcareCost: 89.1, lifeExpectancy: 84.3, chronicDiseaseRate: 30.5, insurancePenetration: 14.5 },
  { year: 2021, elderlyPopulation: 20.2, healthcareCost: 98.2, lifeExpectancy: 85.1, chronicDiseaseRate: 32.8, insurancePenetration: 16.8 },
  { year: 2026, elderlyPopulation: 24.8, healthcareCost: 118.3, lifeExpectancy: 85.8, chronicDiseaseRate: 35.1, insurancePenetration: 19.2 },
  { year: 2031, elderlyPopulation: 29.3, healthcareCost: 142.5, lifeExpectancy: 86.5, chronicDiseaseRate: 37.4, insurancePenetration: 21.7 },
  { year: 2036, elderlyPopulation: 32.4, healthcareCost: 171.6, lifeExpectancy: 87.2, chronicDiseaseRate: 39.7, insurancePenetration: 24.3 },
  { year: 2041, elderlyPopulation: 34.1, healthcareCost: 206.7, lifeExpectancy: 87.9, chronicDiseaseRate: 42.0, insurancePenetration: 27.0 },
];

const formatPercent = (value) => `${value}%`;
const formatCost = (value) => `${value.toFixed(0)}`;
const formatAge = (value) => `${value.toFixed(1)}歲`;

const lineColors = {
  elderlyPopulation: "#8884d8",
  healthcareCost: "#82ca9d",
  lifeExpectancy: "#ffc658",
  chronicDiseaseRate: "#ff8042",
  insurancePenetration: "#0088fe"
};

const lineNames = {
  elderlyPopulation: "65歲以上人口比例 (%)",
  healthcareCost: "醫療成本指數 (2021年=100)",
  lifeExpectancy: "平均預期壽命 (歲)",
  chronicDiseaseRate: "慢性疾病患病率 (%)",
  insurancePenetration: "醫療保險滲透率 (%)"
};

const HongKongTrends = () => {
  const [visibleLines, setVisibleLines] = useState(Object.keys(lineNames));
  const [currentYear, setCurrentYear] = useState(2041);

  const toggleLine = (line) => {
    setVisibleLines(prev => 
      prev.includes(line) ? prev.filter(l => l !== line) : [...prev, line]
    );
  };

  const filteredData = data.filter(item => item.year <= currentYear);

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <h2 className="text-2xl font-bold">香港人口老齡化、醫療成本及保險趨勢（2011-{currentYear}）</h2>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Button onClick={() => setCurrentYear(prev => Math.max(2011, prev - 5))}>-5年</Button>
          <span className="mx-2">{currentYear}</span>
          <Button onClick={() => setCurrentYear(prev => Math.min(2041, prev + 5))}>+5年</Button>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis yAxisId="percent" tickFormatter={formatPercent} />
            <YAxis yAxisId="cost" orientation="right" tickFormatter={formatCost} />
            <YAxis yAxisId="age" orientation="right" tickFormatter={formatAge} />
            <Tooltip />
            <Legend />
            {visibleLines.includes('elderlyPopulation') && <Line yAxisId="percent" type="monotone" dataKey="elderlyPopulation" stroke={lineColors.elderlyPopulation} name={lineNames.elderlyPopulation} />}
            {visibleLines.includes('healthcareCost') && <Line yAxisId="cost" type="monotone" dataKey="healthcareCost" stroke={lineColors.healthcareCost} name={lineNames.healthcareCost} />}
            {visibleLines.includes('lifeExpectancy') && <Line yAxisId="age" type="monotone" dataKey="lifeExpectancy" stroke={lineColors.lifeExpectancy} name={lineNames.lifeExpectancy} />}
            {visibleLines.includes('chronicDiseaseRate') && <Line yAxisId="percent" type="monotone" dataKey="chronicDiseaseRate" stroke={lineColors.chronicDiseaseRate} name={lineNames.chronicDiseaseRate} />}
            {visibleLines.includes('insurancePenetration') && <Line yAxisId="percent" type="monotone" dataKey="insurancePenetration" stroke={lineColors.insurancePenetration} name={lineNames.insurancePenetration} />}
          </LineChart>
        </ResponsiveContainer>
        <div className="mt-4 flex flex-wrap gap-2">
          {Object.entries(lineNames).map(([key, name]) => (
            <div key={key} className="flex items-center">
              <Checkbox
                id={key}
                checked={visibleLines.includes(key)}
                onCheckedChange={() => toggleLine(key)}
              />
              <label htmlFor={key} className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{name}</label>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-gray-600">
          註：數據來源包括香港政府統計處、食物及衞生局及保險業監管局。部分數據為預測值，僅供參考。醫療成本指數基於消費者物價指數（丙類）中的"醫療服務"分項。
        </p>
      </CardContent>
    </Card>
  );
};

export default HongKongTrends;
