const express = require('express');
const app = express();
const usersRouter = require('./routes/users');

app.use(express.json()); // middleware para leer JSON
app.use('/users', usersRouter);

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});