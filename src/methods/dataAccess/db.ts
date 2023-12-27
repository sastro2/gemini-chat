import postgres from 'postgres';

const databaseInstance = postgres(`${process.env.DATABASE_URL}`, process.env.NODE_ENV === 'production' ? {ssl: {require: true, rejectUnauthorized: false}} : {});


export default databaseInstance;