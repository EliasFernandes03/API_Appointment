import { Request, Response } from 'express';
import appointmentService from '../services/appointmentService';
import { ClientAttributes, ConsultAttributes } from '../interfaces/interfaces'; 

async function createAppointment(req: Request, res: Response): Promise<void> {
  try {
    const { nome, telefone, modeloCarro, placaCarro, dia, horario, } = req.body;

    const clientData: ClientAttributes = { 
      nome,
      telefone,
      modeloCarro,
      placaCarro,
    };

    const consultData: ConsultAttributes = {
      dia,
      horario,
      ClientId: "0",
      deleted: false
    };

    const newAppointment = await appointmentService.createAppointment(clientData, consultData); 

    res.status(201).json({ message: 'Agendamento agendada com sucesso!', consulta: newAppointment });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao agendar: Já existe agendamento marcado para esse horário, por favor tente outro horário entre 8:00 - 17:00' });
  }
}

async function updateAppointment(req: Request, res: Response): Promise<void> {
  try {
    const appointmentId = req.params.id; 
    const newData: Partial<ConsultAttributes> = req.body;

    const updatedAppointment = await appointmentService.updateAppointment(appointmentId, newData);

    res.status(200).json({ message: 'Agendamento atualizado com sucesso!', appointment: updatedAppointment });
  } catch (error) {
    console.error('Erro ao atualizar agendamento:', error);
    res.status(500).json({ error: 'Erro ao atualizar agendamento' });
  }
}


async function deleteAppointment(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params; 


    await appointmentService.softDeleteAppointment(id);

    res.status(200).json({ message: 'Agendamento deletado com sucesso.' });
  } catch (error) {
    console.error('Erro ao deletar agendamento:', error);
    res.status(500).json({ error: 'Erro ao deletar agendamento' });
  }
}


async function getUserAppointments(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;

    const appointment = await appointmentService.getUserApointmentsService(id);

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

export default { createAppointment,updateAppointment,deleteAppointment,getUserAppointments };
