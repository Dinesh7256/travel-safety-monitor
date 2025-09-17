
import mongoose from 'mongoose';
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

// MongoDB connection (for alerts/logs)
const connectMongo = async () => {
    try {
        const dbURI = process.env.MONGODB_URI;
        await mongoose.connect(dbURI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
};

// Sequelize MySQL connection (for users/structured data)
const sequelize = new Sequelize(
    process.env.MYSQL_DB || 'stsm_db',
    process.env.MYSQL_USER || 'root',
    process.env.MYSQL_PASSWORD || '',
    {
        host: process.env.MYSQL_HOST || 'localhost',
        dialect: 'mysql',
        logging: false,
    }
);

const connectMySQL = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected to MySQL');
    } catch (error) {
        console.error('MySQL connection error:', error);
    }
};

export { connectMongo, connectMySQL, sequelize };