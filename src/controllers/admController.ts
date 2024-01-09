import { Request, Response } from 'express';
import { buscarConsultasPorDiaService,buscarConsultasDaProximaSemanaService, getAppointmentsMonthService } from '../services/admService';

export async function buscarConsultasPorDiaController(req: Request, res: Response): Promise<void> {
    try {
      const { data } = req.body;
  
      if (!data) {
        res.status(400).json({ error: 'É necessário fornecer a data no corpo da requisição.' });
        return;
      }
  
      const consultas = await buscarConsultasPorDiaService(data);
      res.status(200).json({ consultas });
    } catch (error) {
      console.error('Erro ao buscar consultas por dia:', error);
      res.status(500).json({ error: 'Erro ao buscar consultas por dia' });
    }
}

export async function buscarConsultasDaProximaSemanaController(req: Request, res: Response): Promise<void> {
    try {
      const { data } = req.body;
  
      if (!data) {
        res.status(400).json({ error: 'É necessário fornecer a data no corpo da requisição.' });
        return;
      }
  
      const consultas = await buscarConsultasDaProximaSemanaService(data);
      res.status(200).json({ consultas });
    } catch (error) {
      console.error('Erro ao buscar consultas da próxima semana:', error);
      res.status(500).json({ error: 'Erro ao buscar consultas da próxima semana' });
    }
}
export async function getAppointmentsMonthController(req: Request, res: Response): Promise<void> {
    try {
      const { data } = req.body;
  
      if (!data) {
        res.status(400).json({ error: 'É necessário fornecer a data no corpo da requisição.' });
        return;
      }
  
      const consultas = await getAppointmentsMonthService(data);
      res.status(200).json({ consultas });
    } catch (error) {
      console.error('Erro ao buscar consultas do mês:', error);
      res.status(500).json({ error: 'Erro ao buscar consultas do mês' });
    }
  }
export default { buscarConsultasPorDiaController,buscarConsultasDaProximaSemanaController,getAppointmentsMonthController };
