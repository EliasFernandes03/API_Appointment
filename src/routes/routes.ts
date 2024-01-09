// routes/consultas.ts

import express from 'express';
import consultController from '../controllers/consultController';

const router = express.Router();

//User Endpoints
router.post('/create-appointment', consultController.createAppointment);
router.put('/update-appointment/:id', consultController.updateAppointment);
router.put('/delete-appointment/:id', consultController.deleteAppointment);
router.get('/get-appointment/:id',consultController.getUserAppointments);

export default router;
