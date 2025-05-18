const express = require('express');
const userRoutes = require('./routes/userRoutes');
const sequelize = require('./config/database');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/users', userRoutes);

async function startServer() {
  let connected = false;
  let retries = 10;

  while (!connected && retries > 0) {
    try {
      await sequelize.authenticate();
      console.log("✅ Conectado a la base de datos");
      connected = true;
    } catch (err) {
      console.log("⏳ Esperando base de datos, reintentando en 3s...");
      retries--;
      await new Promise(res => setTimeout(res, 3000));
    }
  }

  if (!connected) {
    console.error("❌ No se pudo conectar a la base de datos después de varios intentos.");
    process.exit(1);
  }

  await sequelize.sync();
  app.listen(port, '0.0.0.0', () => {
    console.log(`🚀 Servidor escuchando en http://0.0.0.0:${port}`);
  });
}

startServer();
