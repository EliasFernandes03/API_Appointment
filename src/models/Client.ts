import { DataTypes, Model } from 'sequelize';
import {sequelize} from '../database/connection';
import { ClientAttributes } from '../interfaces/interfaces';
import Appointment from './Appointment';

class Client extends Model<ClientAttributes> implements ClientAttributes {
  public id!: string;
  public nome!: string;
  public telefone!: string;
  public modeloCarro!: string;
  public placaCarro!: string;

  // Relacionamento com Consulta
  public readonly appointment?: Appointment[];
}

Client.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    telefone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    modeloCarro: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    placaCarro: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Client',
    timestamps:false
  }
);

export default Client;
