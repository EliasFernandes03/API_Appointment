import { Request, Response } from 'express';
import { ClientAttributes, AppointmentAttributes } from '../interfaces/interfaces';
import AppointmentService from '../services/appointmentService';

export class AppointmentController {
  static async create(req: Request, res: Response) {
    try {
      const { nome, telefone, modeloCarro, placaCarro, dia, horario } = req.body;

      const clientData: ClientAttributes = { 
        nome,
        telefone,
        modeloCarro,
        placaCarro,
      };

      const consultData: AppointmentAttributes = {
        dia,
        horario,
        ClientId: "0",
        deleted: false
      };

      const newAppointment = await AppointmentService.createAppointment(clientData, consultData); 

      res.status(201).json({ message: 'Agendamento agendada com sucesso!', consulta: newAppointment });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao agendar: Já existe agendamento marcado para esse horário, por favor tente outro horário entre 8:00 - 17:00' });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const appointmentId = req.params.id; 
      const newData: Partial<AppointmentAttributes> = req.body;

      const updatedAppointment = await AppointmentService.updateAppointment(appointmentId, newData);

      res.status(200).json({ message: 'Agendamento atualizado com sucesso!', appointment: updatedAppointment });
    } catch (error) {
      console.error('Erro ao atualizar agendamento:', error);
      res.status(500).json({ error: 'Erro ao atualizar agendamento' });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params; 

      await AppointmentService.softDeleteAppointment(id);

      res.status(200).json({ message: 'Agendamento deletado com sucesso.' });
    } catch (error) {
      console.error('Erro ao deletar agendamento:', error);
      res.status(500).json({ error: 'Erro ao deletar agendamento' });
    }
  }

  static async getUserAppointments(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const appointment = await AppointmentService.getUserAppointments(id);

      if (!appointment) {
        res.status(404).json({ message: 'Agendamento não encontrado.' });
        return;
      }

      res.status(200).json({ appointment });
    } catch (error) {
      console.error('Erro ao buscar agendamento:', error);
      res.status(500).json({ error: 'Erro ao buscar agendamento' });
    }
  }
}
