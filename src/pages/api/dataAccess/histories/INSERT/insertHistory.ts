import { History } from '../../../../../_types/History';
import databaseInstance from '../../db';

export async function insertHistory(userId: number, created: Date, temperature: number ): Promise<History | null> {
  const result = await databaseInstance`
    INSERT INTO histories("userId", created, temperature)
    VALUES(${userId}, ${created}, ${temperature})
    RETURNING id, temperature, created;
  `

  if (result.length > 0) {
    const { id, temperature, created } = result[0];
    return {id: id, temperature: temperature, messages: [], created: created};
  } else {
    return null;
  };
};