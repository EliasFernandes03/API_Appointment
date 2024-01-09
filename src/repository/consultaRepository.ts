// repositories/consultaRepository.ts

import Consult from '../models/Consult';
import { ConsultAttributes } from '../interfaces/interfaces';
import { v4 as uuidv4 } from 'uuid';

async function criarConsulta(consultaData: ConsultAttributes): Promise<any> {
  const consultaComUuid = { ...consultaData, id: uuidv4() }; // Adicionar UUID v4 à consulta
  return Consult.create(consultaComUuid);
}

export default { criarConsulta };
