import Consult from '../models/Consult';
import { ConsultAttributes } from '../interfaces/interfaces';
import { v4 as uuidv4 } from 'uuid';

export async function createAppointmentRepository(consultaData: ConsultAttributes): Promise<any> {
  const consultaComUuid = { ...consultaData, id: uuidv4() }; 
  return Consult.create(consultaComUuid);
}

export async function findAppointment(dia: string, horario: string): Promise<ConsultAttributes[]> {
  try {
    const consultas = await Consult.findAll({
      where: {
        dia,
        horario,
      },
    });

    return consultas;
  } catch (error) {
    throw new Error(`Erro ao buscar consultas por dia e horário: ${error}`);
  }
}

export async function findAppointmentById(id: string): Promise<ConsultAttributes | null> {
  try {
    const appointment = await Consult.findByPk(id);
    return appointment;
  } catch (error) {
    throw new Error(`Erro ao buscar agendamento por ID: ${error}`);
  }
}

export async function updateAppointment(id: string, newData: Partial<ConsultAttributes>): Promise<any> {
  try {
    const appointment = await Consult.findByPk(id);

    if (!appointment) {
      throw new Error('Agendamento não encontrado.');
    }
    const updatedAppointment = await appointment.update(newData);
    return updatedAppointment;
  } catch (error) {
    throw new Error(`Erro ao atualizar agendamento: ${error}`);
  }
}


export async function findOneClientAppointment(id: string): Promise<any> {
  return Consult.findOne({
    where: {
      id,
      deleted: false,
    },
  });
}

export default { createAppointmentRepository,findAppointment,findAppointmentById,updateAppointment,findOneClientAppointment };
