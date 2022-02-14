import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  { 역명: '서울역', 승차총승객수: 16407, 하차총승객수: 14010 },
  { 역명: '동묘앞	', 승차총승객수: 3082, 하차총승객수: 3500 },
  { 역명: '시청', 승차총승객수: 3743, 하차총승객수: 3740 },
  { 역명: '종각', 승차총승객수: 7295, 하차총승객수: 6513 },
  { 역명: '종로3가', 승차총승객수: 6012, 하차총승객수: 5363 },
];

export default class rechartsSimpleLineChart extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/xqjtetw0/';

  render () {
    return (
      <LineChart
        width={1000}
        height={300}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="역명" /><YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="승차총승객수" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="하차총승객수" stroke="#82ca9d" />
      </LineChart>
    );
  }
}