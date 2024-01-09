// routes/consultas.ts

import express from 'express';
import consultController from '../controllers/consultController';

const router = express.Router();

router.post('/create-appointment', consultController.createAppointment);

export default router;
