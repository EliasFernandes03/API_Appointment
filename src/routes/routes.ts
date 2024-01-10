import express from 'express';
import { 
    createAppointmentController, 
    deleteAppointmentController, 
    getUserAppointmentsController, 
    updateAppointmentController 
} from '../controllers/appointmentController';
import{ 
    getAppointmentsDayController, 
    getAppointmentsMonthController, 
    getAppointmentsWeekController 
} from '../controllers/admController';
import { verificarToken } from '../middleware/token';

const router = express.Router();

// User Endpoints
router.post('/create-appointment', createAppointmentController);
router.put('/update-appointment/:id', updateAppointmentController);
router.put('/delete-appointment/:id', deleteAppointmentController);
router.get('/get-appointment/:id', getUserAppointmentsController);

// Adm Endpoints
router.get('/appointments-day', verificarToken, getAppointmentsDayController);
router.get('/appointments-week', verificarToken, getAppointmentsWeekController);
router.get('/appointments-month', verificarToken, getAppointmentsMonthController);


export default router;
