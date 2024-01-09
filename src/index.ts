// index.ts
import dotenv from 'dotenv';
import express, { Request, Response } from 'express';

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

const app = express();
const PORT = 3300;

app.listen(PORT, () => {
  console.log(`Servidor está rodando em http://localhost:${PORT}`);
});
