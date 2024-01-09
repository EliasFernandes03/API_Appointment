import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();
const dbName = process.env.DB_NAME as string;
const dbUser = process.env.DB_USER as string;
const dbPassword = process.env.DB_PASSWORD as string;
const dbHost = process.env.DB_HOST as string;

export const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
});


