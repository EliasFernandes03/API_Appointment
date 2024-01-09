// routes/consultas.ts

import express from 'express';
import consultaController from '../controllers/consultaController';

const router = express.Router();

router.post('/criar-consulta', consultaController.criarConsulta);

export default router;
