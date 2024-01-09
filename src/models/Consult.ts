import { DataTypes, Model } from 'sequelize';
import {sequelize} from '../database/connection';
import Client from './Client';
import { ConsultAttributes } from '../interfaces/interfaces';

class Consult extends Model<ConsultAttributes> implements ConsultAttributes {
  public id!: string;
  public dia!: Date;
  public horario!: string;
  public ClientId!: string;

  // Relacionamento com Cliente
  public readonly client?: Client;
}

Consult.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    dia: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    horario: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ClientId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Consult',
    timestamps:false
  }
);

export default Consult;
