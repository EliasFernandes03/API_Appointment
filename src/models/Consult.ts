import { DataTypes, Model } from 'sequelize';
import {sequelize} from '../database/connection';
import Cliente from './Client';
import { ConsultaAttributes } from '../Interfaces/interfaces';

class Consulta extends Model<ConsultaAttributes> implements ConsultaAttributes {
  public id!: number;
  public dia!: Date;
  public horario!: string;
  public ClienteId!: number;

  // Relacionamento com Cliente
  public readonly cliente?: Cliente;
}

Consulta.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
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
    ClienteId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Consulta',
  }
);

Consulta.belongsTo(Cliente);
Cliente.hasMany(Consulta);

export default Consulta;
