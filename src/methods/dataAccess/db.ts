import postgres from 'postgres';

const databaseInstance = postgres(`${process.env.DATABASE_URL}`, {ssl: {require: true, rejectUnauthorized: false}});


export default databaseInstance;