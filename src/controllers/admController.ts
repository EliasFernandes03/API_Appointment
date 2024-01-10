import { Request, Response } from 'express';
import { 
  getAppointmentDayService,
  getAppointmentWeekService, 
  getAppointmentsMonthService 
} from '../services/admService';

export async function getAppointmentsDayController(req: Request, res: Response) {
    try {
      const { data } = req.body;
  
      if (!data) {
        res.status(400).json({ error: 'É necessário fornecer a data no corpo da requisição.' });
        return;
      }
  
      const appointment = await getAppointmentDayService(data);
      res.status(200).json({ appointment });
    } catch (error) {
      console.error('Erro ao buscar revisões por dia:', error);
      res.status(500).json({ error: 'Erro ao buscar revisões por dia' });
    }
}

export async function getAppointmentsWeekController(req: Request, res: Response) {
    try {
      const { data } = req.body;
  
      if (!data) {
        res.status(400).json({ error: 'É necessário fornecer a data no corpo da requisição.' });
        return;
      }
  
      const appointment = await getAppointmentWeekService(data);
      res.status(200).json({ appointment });
    } catch (error) {
      console.error('Erro ao buscar revisões da próxima semana:', error);
      res.status(500).json({ error: 'Erro ao buscar revisões da próxima semana' });
    }
}
export async function getAppointmentsMonthController(req: Request, res: Response) {
    try {
      const { data } = req.body;
  
      if (!data) {
        res.status(400).json({ error: 'É necessário fornecer a data no corpo da requisição.' });
        return;
      }
  
      const appointment = await getAppointmentsMonthService(data);
      res.status(200).json({ appointment });
    } catch (error) {
      console.error('Erro ao buscar revisões do mês:', error);
      res.status(500).json({ error: 'Erro ao buscar revisões do mês' });
    }
  }

