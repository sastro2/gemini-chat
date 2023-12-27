import postgres from 'postgres';

const databaseInstance = postgres(`${process.env.DATABASE_URL}`);


export default databaseInstance;