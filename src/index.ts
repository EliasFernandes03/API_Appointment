import express from 'express';
import { initDatabase } from './services/databaseInitializer';
import consultaRoutes from './routes/routes'; 
import bodyParser from 'body-parser';

initDatabase()

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', consultaRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Servidor está rodando em http://localhost:${process.env.PORT}`);
});

// Trocar as promises conferir
// Padroes de repository ingles
// tirar os dotenv nao preciso mais
// documentação
