import { findByPhone, createClient } from '../repository/clientRepository';
import { ClientAttributes, ConsultAttributes } from '../interfaces/interfaces';
import consultRepository from '../repository/consultRepository';
import { v4 as uuidv4 } from 'uuid';
import Consult from '../models/Consult';

async function createAppointmentService(clientData: ClientAttributes, consultData: ConsultAttributes): Promise<any> {
  const { nome, telefone, modeloCarro, placaCarro } = clientData;
  const { dia, horario } = consultData;

  let client = await findByPhone(telefone);

  if (!client) {
    client = await createClient({ nome, telefone, modeloCarro, placaCarro });
  }

  const consultaExistente = await consultRepository.findAppointment(dia, horario);
  if (consultaExistente.length > 0) {
    throw new Error('Já existe um agendamento marcado para esse dia e horário.');
  }

  const newAppointment = await consultRepository.createAppointmentRepository({
    id: uuidv4(),
    dia,
    horario,
    ClientId: client.id,
    deleted: false
  });

  return newAppointment;
}

export async function updateAppointment(id: string, newData: Partial<ConsultAttributes>): Promise<any> {
  try {
    const appointment = await Consult.findByPk(id);

    if (!appointment) {
      throw new Error('Agendamento não encontrado.');
    }

    const { dia, horario } = newData;

    if (dia === undefined || horario === undefined) {
      throw new Error('Dia e/ou horário não fornecidos corretamente.');
    }

    const existingConsult = await consultRepository.findAppointment(dia, horario);
    if (existingConsult.length > 0) {
      throw new Error('Já existe um agendamento marcado para o novo dia e horário.');
    }

    const updatedAppointment = await appointment.update(newData);
    return updatedAppointment;
  } catch (error) {
    throw new Error('Erro ao atualizar agendamento: Favor preencher uma data válida');
  }
}

async function softDeleteAppointment(id: string): Promise<void> {
  try {
    const appointment = await Consult.findByPk(id);

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
    const appointment = await consultRepository.findOneClientAppointment(id);
    console.log(appointment)
    return appointment;
   
  } catch (error) {
    throw new Error(`Erro ao buscar agendamento: ${error}`);
  }
}

export default { createAppointmentService,updateAppointment,softDeleteAppointment,getUserApointmentsService };
