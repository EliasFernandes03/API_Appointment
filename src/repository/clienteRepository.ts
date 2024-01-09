import { v4 as uuidv4 } from 'uuid';
import Client from '../models/Client';

export async function encontrarClientePorTelefone(telefone: string): Promise<any> {
  return Client.findOne({ where: { telefone } });
}

export async function criarCliente(clienteData: any): Promise<any> {
  const clienteComUuid = { ...clienteData, id: uuidv4() };
  return Client.create(clienteComUuid);
}