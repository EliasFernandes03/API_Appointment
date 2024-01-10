import Appointment from '../models/Appointment';
import { 
  getAppointmentsDayRepository, 
  getAppointmentsMonth, 
  getAppointmentsWeekRepository,
 } from '../repository/admRepository';

export async function getAppointmentDayService(data: string): Promise<any> {
    try {
      const appointment = await getAppointmentsDayRepository(data);
      return appointment;
    } catch (error) {
      throw new Error('Erro ao buscar as revisões do dia');
    }
  }


export async function getAppointmentWeekService(data: string): Promise<Appointment[]> {
  try {
    const appointment = await getAppointmentsWeekRepository(data);
    return appointment;
  } catch (error) {
    throw new Error('Erro ao buscar revisões da próxima semana');
  }
}

export async function getAppointmentsMonthService(data: string): Promise<any> {
    try {
      const appointment = await getAppointmentsMonth(data);
      return appointment;
    } catch (error) {
      throw new Error('Erro ao buscar revisões do mês');
    }
  }
  