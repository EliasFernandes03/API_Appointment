import express from 'express';
import { initDatabase } from './services/databaseInitializer';
import appointmentRoutes from './routes/routes'; 
import bodyParser from 'body-parser';
import cors from 'cors';

initDatabase()

const app = express();
app.use(cors());

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', appointmentRoutes);

app.listen(3300, () => {
  console.log(`Servidor está rodando em http://localhost:3300`);
});
