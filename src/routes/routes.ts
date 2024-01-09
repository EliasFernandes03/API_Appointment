import express from 'express';
import appointmentController from '../controllers/appointmentController';
import admController from '../controllers/admController';
import { verificarToken } from '../middleware/token';

const router = express.Router();

//User Endpoints
router.post('/create-appointment', appointmentController.createAppointmentController);
router.put('/update-appointment/:id', appointmentController.updateAppointmentController);
router.put('/delete-appointment/:id', appointmentController.deleteAppointmentController);
router.get('/get-appointment/:id',appointmentController.getUserAppointmentsController);


//Adm Endpoints
router.get('/appointments-day',verificarToken,admController.getAppointmentsDayController);
router.get('/appointments-week',verificarToken,admController.getAppointmentsWeekController);
router.get('/appointments-month',verificarToken,admController.getAppointmentsMonthController);


export default router;
