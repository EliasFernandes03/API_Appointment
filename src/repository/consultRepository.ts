import Consult from '../models/Consult';
import { ConsultAttributes } from '../interfaces/interfaces';
import { v4 as uuidv4 } from 'uuid';

export async function createAppointment(consultaData: ConsultAttributes): Promise<any> {
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
export default { createAppointment,findAppointment };
