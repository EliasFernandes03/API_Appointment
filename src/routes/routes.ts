// routes/consultas.ts

import express from 'express';
import consultController from '../controllers/consultController';
import admController from '../controllers/admController';
import { verificarToken } from '../middleware/token';

const router = express.Router();

//User Endpoints
router.post('/create-appointment', consultController.createAppointmentController);
router.put('/update-appointment/:id', consultController.updateAppointmentController);
router.put('/delete-appointment/:id', consultController.deleteAppointmentController);
router.get('/get-appointment/:id',consultController.getUserAppointmentsController);


//Adm Endpoints
router.get('/appointments-day',verificarToken,admController.getAppointmentsDayController);
router.get('/appointments-week',verificarToken,admController.getAppointmentsWeekController);
router.get('/appointments-month',verificarToken,admController.getAppointmentsMonthController);


export default router;
