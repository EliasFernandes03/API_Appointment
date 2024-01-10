import sequelize from 'sequelize';
import Appointment from '../models/Appointment';
import { Op } from 'sequelize';
import moment from 'moment';

export async function getAppointmentsDayRepository(dia: string): Promise<Appointment[]> {
    try {
      const appointment = await Appointment.findAll({
        where: sequelize.where(sequelize.fn('DATE', sequelize.col('dia')), '=', dia),
      });
  
      return appointment;
    } catch (error) {
      throw new Error('Erro ao buscar revisões por dia');
    }
}

export async function getAppointmentsWeekRepository(data: string): Promise<Appointment[]> {
  try {
    const startOfWeek = moment(data, 'YYYY-MM-DD').startOf('isoWeek').format('YYYY-MM-DD');
    const endOfWeek = moment(data, 'YYYY-MM-DD').endOf('isoWeek').format('YYYY-MM-DD');

    const appointments = await Appointment.findAll({
      where: {
        dia: {
          [Op.between]: [startOfWeek, endOfWeek],
        },
      },
    });

    return appointments;
  } catch (error) {
    throw new Error('Erro ao buscar revisões da semana');
  }
}

export async function getAppointmentsMonth(data: string): Promise<Appointment[]> {
  try {
    const startOfMonth = moment(data, 'YYYY-MM-DD').startOf('month').format('YYYY-MM-DD');
    const endOfMonth = moment(data, 'YYYY-MM-DD').endOf('month').format('YYYY-MM-DD');

    const appointments = await Appointment.findAll({
      where: {
        dia: {
          [Op.between]: [startOfMonth, endOfMonth],
        },
      },
    });

    return appointments;
  } catch (error) {
    throw new Error('Erro ao buscar revisões do mês');
  }
}
