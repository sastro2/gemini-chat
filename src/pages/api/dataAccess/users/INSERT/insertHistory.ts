import { History } from '../../../../../_types/History';
import databaseInstance from '../../db';

export async function insertHistory(userId: number, created: Date, temperature: number ): Promise<History | null> {
  const result = await databaseInstance`
    INSERT INTO histories("userId", created, temperature)
    VALUES(${userId}, ${created}, ${temperature})
    RETURNING id, temperature;
  `

  if (result.length > 0) {
    const { id, temperature } = result[0];
    return {id: id, temperature: temperature, messages: []};
  } else {
    return null;
  };
};