// consultaService.ts
import { buscarConsultasPorDia, getAppointmentsMonth, getAppointmentsWeek } from '../repository/admRepository';

export async function buscarConsultasPorDiaService(data: string): Promise<any> {
    try {
      // Aqui podemos adicionar validações extras, se necessário
  
      const consultas = await buscarConsultasPorDia(data);
      return consultas;
    } catch (error) {
      throw new Error('Erro ao buscar as consultas do dia');
    }
  }


export async function buscarConsultasDaProximaSemanaService(data: string): Promise<any> {
  try {
    const consultas = await getAppointmentsWeek(data);
    return consultas;
  } catch (error) {
    throw new Error('Erro ao buscar consultas da próxima semana');
  }
}

export async function getAppointmentsMonthService(data: string): Promise<any> {
    try {
      const consultas = await getAppointmentsMonth(data);
      return consultas;
    } catch (error) {
      throw new Error('Erro ao buscar consultas do mês');
    }
  }
  