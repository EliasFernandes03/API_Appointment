import express from 'express';
import { 
    CreateAppointmentController, 
    DeleteAppointmentController, 
    GetUserAppointmentsController, 
    UpdateAppointmentController 
} from '../controllers/appointmentController';
import{ 
    getAppointmentsDayController, 
    getAppointmentsMonthController, 
    getAppointmentsWeekController 
} from '../controllers/admController';
import { verificarToken } from '../middleware/authToken';

const router = express.Router();

router.post('/create-appointment', new CreateAppointmentController().handle);
router.put('/update-appointment/:id', new UpdateAppointmentController().handle);
router.put('/delete-appointment/:id', new DeleteAppointmentController().handle);
router.get('/get-appointment/:id', new GetUserAppointmentsController().handle);

// Adm Endpoints
router.get('/appointments-day/:data', verificarToken, getAppointmentsDayController);
router.get('/appointments-week/:data', verificarToken, getAppointmentsWeekController);
router.get('/appointments-month/:data', verificarToken, getAppointmentsMonthController);


export default router;
