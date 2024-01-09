import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import { inicializarBancoDados } from './services/databaseInitializer';
import consultaRoutes from './routes/routes'; 
import bodyParser from 'body-parser';
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



app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/consultas', consultaRoutes);



app.listen(PORT, () => {
  console.log(`Servidor está rodando em http://localhost:${PORT}`);
});
