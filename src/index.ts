// index.ts
import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import { inicializarBancoDados } from './services/databaseInitializer';

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

const app = express();
const PORT = 3300;

inicializarBancoDados()
  .then(() => {
    console.log('Banco de dados inicializado com sucesso.');
  })
  .catch((error) => {
    console.error('Erro ao inicializar banco de dados:', error);
  });
  
app.listen(PORT, () => {
  console.log(`Servidor está rodando em http://localhost:${PORT}`);
});
