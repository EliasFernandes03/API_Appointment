// services/consultaService.ts

import consultaRepository from '../repository/consultaRepository';
import { encontrarClientePorTelefone,criarCliente} from '../repository/clienteRepository'
import { ClientAttributes, ConsultAttributes } from '../interfaces/interfaces';
import { v4 as uuidv4 } from 'uuid';

async function criarConsulta(clientData: ClientAttributes,consultData:ConsultAttributes): Promise<any> {
  const { nome, telefone, modeloCarro, placaCarro } = clientData;
  const {dia, horario} = consultData;

  let cliente = await encontrarClientePorTelefone(telefone);

  if (!cliente) {
    cliente = await criarCliente({ nome, telefone, modeloCarro, placaCarro });
  }

  const novaConsulta = await consultaRepository.criarConsulta({
    id: uuidv4(), 
    dia,
    horario,
    ClientId: cliente.id, 
  });

  return novaConsulta;
}

export default { criarConsulta };
