import databaseInstance from '../../db';

export async function insertError(errorCode: number, message: string): Promise<number | null> {
  const result = await databaseInstance`
    INSERT INTO errors("errorCode", created, message)
    VALUES(${errorCode}, NOW(), ${message})
    RETURNING id;
  `

  if(typeof result[0].id !== 'number') return null;

  return result[0].id? result[0].id: null;
}