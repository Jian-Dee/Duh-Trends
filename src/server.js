const express = require('express');
const app = express();

const areaRoutes = require('./routes/area');
const rentRoutes = require('./routes/rent');
const paymentRoutes = require('./routes/payment');
const userRoutes = require('./routes/user');
const itemRoutes = require('./routes/item');
const saleRoutes = require('./routes/sale');
const stockRoutes = require('./routes/stock');

app.use(express.json());

app.use('/api/area', areaRoutes);
app.use('/api/rent', rentRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/user', userRoutes);
app.use('/api/item', itemRoutes);
app.use('/api/sale', saleRoutes);
app.use('/api/stock', stockRoutes);

const PORT = 3001; // Direct value
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
