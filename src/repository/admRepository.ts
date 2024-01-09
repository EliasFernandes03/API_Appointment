// consultaRepository.ts
import sequelize from 'sequelize';
import Consult from '../models/Consult';
import { Op } from 'sequelize';
import moment from 'moment';

export async function getAppointmentsDayRepository(dia: string): Promise<any> {
    try {
      const consultas = await Consult.findAll({
        where: sequelize.where(sequelize.fn('DATE', sequelize.col('dia')), '=', dia),
      });
  
      return consultas;
    } catch (error) {
      throw new Error('Erro ao buscar consultas por dia');
    }
}

export async function getAppointmentsWeek(data: string): Promise<any> {
  try {
    const startOfWeek = moment(data, 'YYYY-MM-DD').startOf('isoWeek').format('YYYY-MM-DD');
    const endOfWeek = moment(data, 'YYYY-MM-DD').endOf('isoWeek').format('YYYY-MM-DD');

    const appointments = await Consult.findAll({
      where: {
        dia: {
          [Op.between]: [startOfWeek, endOfWeek],
        },
      },
    });

    return appointments;
  } catch (error) {
    throw new Error('Erro ao buscar consultas da semana');
  }
}

export async function getAppointmentsMonth(data: string): Promise<any> {
  try {
    const startOfMonth = moment(data, 'YYYY-MM-DD').startOf('month').format('YYYY-MM-DD');
    const endOfMonth = moment(data, 'YYYY-MM-DD').endOf('month').format('YYYY-MM-DD');

    const appointments = await Consult.findAll({
      where: {
        dia: {
          [Op.between]: [startOfMonth, endOfMonth],
        },
      },
    });

    return appointments;
  } catch (error) {
    throw new Error('Erro ao buscar consultas do mês');
  }
}
