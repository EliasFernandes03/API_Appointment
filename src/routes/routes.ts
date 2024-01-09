// routes/consultas.ts

import express from 'express';
import consultController from '../controllers/consultController';
import admController from '../controllers/admController';

const router = express.Router();

//User Endpoints
router.post('/create-appointment', consultController.createAppointment);
router.put('/update-appointment/:id', consultController.updateAppointment);
router.put('/delete-appointment/:id', consultController.deleteAppointment);
router.get('/get-appointment/:id',consultController.getUserAppointments);


//Adm Endpoints
router.get('/appointments-day',admController.buscarConsultasPorDiaController);
router.get('/appointments-week',admController.buscarConsultasDaProximaSemanaController);
router.get('/appointments-month',admController.getAppointmentsMonthController);


export default router;
