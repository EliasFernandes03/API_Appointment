import { DataTypes, Model } from 'sequelize';
import {sequelize} from '../database/connection';
import { ClienteAttributes } from '../Interfaces/interfaces';
import Consulta from './Consult';

class Cliente extends Model<ClienteAttributes> implements ClienteAttributes {
  public id!: number;
  public nome!: string;
  public telefone!: string;
  public modeloCarro!: string;
  public placaCarro!: string;

  // Relacionamento com Consulta
  public readonly consultas?: Consulta[];
}

Cliente.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
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
    modelName: 'Cliente',
  }
);

Cliente.hasMany(Consulta);
Consulta.belongsTo(Cliente);

export default Cliente;
