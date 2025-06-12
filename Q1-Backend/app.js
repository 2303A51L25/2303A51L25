const express = require('express');
const cors = require('cors');
const stockRoutes = require('./routes/stocks');

const app = express();
app.use(cors());
app.use('/api', stockRoutes);

const PORT = 8000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
