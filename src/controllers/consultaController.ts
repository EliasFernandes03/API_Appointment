import { Request, Response } from 'express';
import ConsultaService from '../services/consultaService';
import { ClientAttributes, ConsultAttributes } from '../interfaces/interfaces'; // Importe as interfaces necessárias

async function criarConsulta(req: Request, res: Response): Promise<void> {
  try {
    const { nome, telefone, modeloCarro, placaCarro, dia, horario } = req.body;

    const clientData: ClientAttributes = { // Crie um objeto com os dados do cliente
      nome,
      telefone,
      modeloCarro,
      placaCarro,
    };

    const consultData: ConsultAttributes = { // Crie um objeto com os dados da consulta
      dia,
      horario,
      ClientId:"0"
    };

    const novaConsulta = await ConsultaService.criarConsulta(clientData, consultData); // Passe ambos os objetos para a função

    res.status(201).json({ message: 'Consulta agendada com sucesso!', consulta: novaConsulta });
  } catch (error) {
    console.error('Erro ao agendar consulta:', error);
    res.status(500).json({ error: 'Erro ao agendar consulta' });
  }
}

export default { criarConsulta };
