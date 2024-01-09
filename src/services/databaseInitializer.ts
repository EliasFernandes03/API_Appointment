import {sequelize} from '../database/connection';
import Client from '../models/Client';
import Consult from '../models/Consult';

async function connectDatabase(): Promise<void> {
  try {
    await sequelize.authenticate();
    console.log('Conexão bem sucedida com o banco de dados.');
  } catch (error) {
    console.error('Erro ao conectar com o banco de dados:', error);
    throw error;
  }
}

async function syncTables(): Promise<void> {
  try {
    await Client.sync(); 
    await Consult.sync();
    console.log('Tabelas sincronizadas com sucesso.');
  } catch (error) {
    console.error('Erro ao sincronizar tabelas:', error);
    throw error;
  }
}

export async function inicializarBancoDados(): Promise<void> {
  try {
    await connectDatabase();
    await syncTables();
  } catch (error) {
    console.error('Erro ao inicializar banco de dados:', error);
    throw error;
  }
}
