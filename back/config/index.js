import  dotenv from 'dotenv';

dotenv.config()

export default {
    DB_INFO: process.env.DB_INFO,
    JWT_SECRET: process.env.JWT_SECRET,
    PORT: process.env.PORT,
}