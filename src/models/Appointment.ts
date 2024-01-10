import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../database/connection';
import Client from './Client';
import { AppointmentAttributes } from '../interfaces/interfaces';

class Appointment extends Model<AppointmentAttributes> implements AppointmentAttributes {
  public id!: string;
  public dia!: string;
  public horario!: string;
  public ClientId!: string;
  public deleted!:boolean;

  // Relacionamento com Cliente
  public readonly client?: Client;
}

Appointment.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    dia: {
      type: DataTypes.STRING,
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
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull:false,
    },
  },
  {
    sequelize,
    modelName: 'Appointment',
    timestamps:false
  }
);

export default Appointment;
