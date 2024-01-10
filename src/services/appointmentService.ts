import { findByPhone, createClient } from '../repository/clientRepository';
import { ClientAttributes, AppointmentAttributes } from '../interfaces/interfaces';
import { 
  createAppointmentRepository, 
  findAppointmentRepository, 
  getOneClientRepository 
} from '../repository/appointmentRepository';
import { v4 as uuidv4 } from 'uuid';
import Appointment from '../models/Appointment';

export async function createAppointmentService(clientData: ClientAttributes, consultData: AppointmentAttributes): Promise<any> {
  const { nome, telefone, modeloCarro, placaCarro } = clientData;
  const { dia, horario } = consultData;

  let client = await findByPhone(telefone);

  if (!client) {
    client = await createClient({ nome, telefone, modeloCarro, placaCarro });
  }

  const consultaExistente = await findAppointmentRepository(dia, horario);
  if (consultaExistente.length > 0) {
    throw new Error('Já existe um agendamento marcado para esse dia e horário.');
  }

  const newAppointment = await createAppointmentRepository({
    id: uuidv4(),
    dia,
    horario,
    ClientId: client.id,
    deleted: false
  });

  return newAppointment;
}

export async function updateAppointmentService(id: string, newData: Partial<AppointmentAttributes>): Promise<any> {
  try {
    const appointment = await Appointment.findByPk(id);

    if (!appointment) {
      throw new Error('Agendamento não encontrado.');
    }

    const { dia, horario } = newData;

    if (dia === undefined || horario === undefined) {
      throw new Error('Dia e/ou horário não fornecidos corretamente.');
    }

    const existingConsult = await findAppointmentRepository(dia, horario);
    if (existingConsult.length > 0) {
      throw new Error('Já existe um agendamento marcado para o novo dia e horário.');
    }

    const updatedAppointment = await appointment.update(newData);
    return updatedAppointment;
  } catch (error) {
    throw new Error('Erro ao atualizar agendamento: Favor preencher uma data válida');
  }
}

export async function softDeleteAppointmentService(id: string): Promise<void> {
  try {
    const appointment = await Appointment.findByPk(id);

    if (!appointment) {
      throw new Error('Agendamento não encontrado.');
    }

    await appointment.update({ deleted: true });

  } catch (error) {
    throw new Error(`Erro ao marcar agendamento como deletado: ${error}`);
  }
}

export async function getUserApointmentsService(id: string): Promise<any> {
  try {
    const appointment = await getOneClientRepository(id);
    console.log(appointment)
    return appointment;
   
  } catch (error) {
    throw new Error(`Erro ao buscar agendamento: ${error}`);
  }
}

