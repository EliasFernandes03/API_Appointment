// index.ts
import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import { sequelize } from './database/connection';

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

const app = express();
const PORT = 3300;

sequelize.authenticate()
  .then(() => {
    console.log('Conexão bem sucedida com o banco de dados.');
  })
  .catch((error) => {
    console.error('Erro ao conectar com o banco de dados:', error);
  });

app.listen(PORT, () => {
  console.log(`Servidor está rodando em http://localhost:${PORT}`);
});
