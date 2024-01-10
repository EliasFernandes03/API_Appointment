import express from 'express';
import { initDatabase } from './services/databaseInitializer';
import appointmentRoutes from './routes/routes'; 
import bodyParser from 'body-parser';

initDatabase()

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', appointmentRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Servidor está rodando em http://localhost:${process.env.PORT}`);
});
