import { v4 as uuidv4 } from 'uuid';
import Client from '../models/Client';

export async function findByPhone(telefone: string) {
  return Client.findOne({ where: { telefone } });
}

export async function createClient(clienteData: any) {
  const clienteComUuid = { ...clienteData, id: uuidv4() };
  return Client.create(clienteComUuid);
}