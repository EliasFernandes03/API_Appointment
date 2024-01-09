// routes/consultas.ts

import express from 'express';
import consultController from '../controllers/consultController';
import admController from '../controllers/admController';
import { verificarToken } from '../middleware/token';

const router = express.Router();

//User Endpoints
router.post('/create-appointment', consultController.createAppointment);
router.put('/update-appointment/:id', consultController.updateAppointment);
router.put('/delete-appointment/:id', consultController.deleteAppointment);
router.get('/get-appointment/:id',consultController.getUserAppointments);


//Adm Endpoints
router.get('/appointments-day',verificarToken,admController.buscarConsultasPorDiaController);
router.get('/appointments-week',verificarToken,admController.buscarConsultasDaProximaSemanaController);
router.get('/appointments-month',verificarToken,admController.getAppointmentsMonthController);


export default router;
