const express = require('express');
const userRoutes = require('./routes/userRoutes');
const sequelize = require('./config/database');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/users', userRoutes);

sequelize.sync().then(() => {
  console.log('Base de datos sincronizada');
  app.listen(port, '0.0.0.0', () => {
    console.log(`Servidor escuchando en http://0.0.0.0:${port}`);
  });
}).catch(err => {
  console.error('Error al conectar la base de datos:', err);
});