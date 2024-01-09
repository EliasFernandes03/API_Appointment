import { Request, Response } from 'express';
import ConsultaService from '../services/consultaService';
import { ClientAttributes, ConsultAttributes } from '../interfaces/interfaces'; 

async function createAppointment(req: Request, res: Response): Promise<void> {
  try {
    const { nome, telefone, modeloCarro, placaCarro, dia, horario } = req.body;

    const clientData: ClientAttributes = { 
      nome,
      telefone,
      modeloCarro,
      placaCarro,
    };

    const consultData: ConsultAttributes = { 
      dia,
      horario,
      ClientId:"0"
    };

    const newAppointment = await ConsultaService.createAppointment(clientData, consultData); 

    res.status(201).json({ message: 'Agendamento agendada com sucesso!', consulta: newAppointment });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao agendar: Já existe agendamento marcado para esse horário, por favor tente outro horário entre 8:00 - 17:00' });
  }
}

export default { createAppointment };
