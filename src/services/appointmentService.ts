import { findByPhone, createClient } from '../repository/clientRepository';
import { ClientAttributes, ConsultAttributes } from '../interfaces/interfaces';
import consultRepository from '../repository/consultRepository';
import { v4 as uuidv4 } from 'uuid';

async function createAppointment(clientData: ClientAttributes, consultData: ConsultAttributes): Promise<any> {
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

  const newAppointment = await consultRepository.createAppointment({
    id: uuidv4(),
    dia,
    horario,
    ClientId: client.id,
  });

  return newAppointment;
}

export default { createAppointment };
