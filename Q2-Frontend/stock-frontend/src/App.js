import React from 'react';
import { Container, Button } from '@mui/material';
import StockChart from './pages/StockChart';

const App = () => {
  return (
    <Container>
      <h1>Stock Price Aggregation</h1>
      <StockChart />
    </Container>
  );
};

export default App;
