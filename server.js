require('dotenv').config();
const cors = require('cors');
const helmet = require('helmet');
const express = require('express');
const app = express();
const port = 3000;

const userRoutes = require('./routes/userRoutes');
const restauranteRoutes = require('./routes/RestauranteRoutes');
const pedidoRoutes = require('./routes/PedidoRoutes');
app.use(express.json());
app.use(helmet());
app.use(cors())

app.use('/usuarios', userRoutes);
app.use('/restaurantes', restauranteRoutes);
app.use('/pedidos', pedidoRoutes);

app.listen(port, () => {
    console.log(`Server running on ${port}`);
});