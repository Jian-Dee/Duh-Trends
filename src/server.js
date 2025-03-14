const express = require('express');
const app = express();
const cors = require('cors');

const areaRoutes = require('./routes/area');
const rentRoutes = require('./routes/rent');
const paymentRoutes = require('./routes/payment');
const userRoutes = require('./routes/user');
const itemRoutes = require('./routes/item');
const saleRoutes = require('./routes/sale');
const stockRoutes = require('./routes/stock');
const authRoutes = require('./routes/auth');

app.use(cors());
app.use(express.json());

app.use(express.static('src/client'));

app.use('/api/area', areaRoutes);
app.use('/api/rent', rentRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/user', userRoutes);
app.use('/api/item', itemRoutes);
app.use('/api/sale', saleRoutes);
app.use('/api/stock', stockRoutes);
app.use('/api/auth', authRoutes);

const PORT = 3001; // Direct value
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
