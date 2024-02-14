import express from 'express';
import { 
    AppointmentController
} from '../controllers/appointmentController';
import{ 
    getAppointmentsDayController, 
    getAppointmentsMonthController, 
    getAppointmentsWeekController 
} from '../controllers/admController';
import { verificarToken } from '../middleware/authToken';

const router = express.Router();

router.post('/create-appointment', AppointmentController.create);
router.put('/update-appointment/:id', AppointmentController.update);
router.put('/delete-appointment/:id', AppointmentController.delete);
router.get('/get-appointment/:id', AppointmentController.getUserAppointments);

// Adm Endpoints
router.get('/appointments-day/:data', verificarToken, getAppointmentsDayController);
router.get('/appointments-week/:data', verificarToken, getAppointmentsWeekController);
router.get('/appointments-month/:data', verificarToken, getAppointmentsMonthController);


export default router;
