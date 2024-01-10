import Appointment from '../models/Appointment';
import { AppointmentAttributes } from '../interfaces/interfaces';
import { v4 as uuidv4 } from 'uuid';

export async function createAppointmentRepository(consultaData: AppointmentAttributes): Promise<any> {
  const consultaComUuid = { ...consultaData, id: uuidv4() }; 
  return Appointment.create(consultaComUuid);
}

export async function findAppointmentRepository(dia: string, horario: string): Promise<AppointmentAttributes[]> {
  try {
    const appointment = await Appointment.findAll({
      where: {
        dia,
        horario,
      },
    });

    return appointment;
  } catch (error) {
    throw new Error(`Erro ao buscar revisões por dia e horário: ${error}`);
  }
}

export async function findAppointmentByIdRepository(id: string): Promise<AppointmentAttributes | null> {
  try {
    const appointment = await Appointment.findByPk(id);
    return appointment;
  } catch (error) {
    throw new Error(`Erro ao buscar agendamento por ID: ${error}`);
  }
}

export async function updateAppointmentRepository(id: string, newData: Partial<AppointmentAttributes>): Promise<any> {
  try {
    const appointment = await Appointment.findByPk(id);

    if (!appointment) {
      throw new Error('Agendamento não encontrado.');
    }
    const updatedAppointment = await appointment.update(newData);
    return updatedAppointment;
  } catch (error) {
    throw new Error(`Erro ao atualizar agendamento: ${error}`);
  }
}


export async function getOneClientRepository(id: string): Promise<any> {
  return Appointment.findOne({
    where: {
      id,
      deleted: false,
    },
  });
}


