import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Container, TextField } from '@mui/material';

const StockChart = () => {
  const [data, setData] = useState([]);
  const [avg, setAvg] = useState(0);
  const [ticker, setTicker] = useState("AAPL");
  const [minutes, setMinutes] = useState(30);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/stocks/${ticker}?minutes=${minutes}`)
      .then(res => {
        setData(res.data.priceHistory);
        setAvg(res.data.averageStockPrice);
      });
  }, [ticker, minutes]);

  return (
    <Container>
      <TextField label="Ticker" value={ticker} onChange={e => setTicker(e.target.value)} />
      <TextField label="Minutes" type="number" value={minutes} onChange={e => setMinutes(e.target.value)} />
      <LineChart width={800} height={400} data={data}>
        <XAxis dataKey="lastUpdatedAt" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="price" stroke="#8884d8" />
        <Line type="monotone" data={data.map(p => ({ ...p, avg }))} dataKey="avg" stroke="red" dot={false} />
      </LineChart>
    </Container>
  );
};

export default StockChart;
