import { dbHistoryGuard } from '../../../Typeguards/dbHistoryGuard';
import { DbHistory } from '../../_models/dbHistory';
import databaseInstance from '../../db';

export async function insertHistory(userId: number, created: Date, temperature: number ): Promise<DbHistory | null> {
  const result = await databaseInstance`
    INSERT INTO histories("userId", created, temperature)
    VALUES(${userId}, ${created}, ${temperature})
    RETURNING id, temperature, created;
  `

  if (result.length > 0) {
    if(!dbHistoryGuard(result[0])) return null;

    const { id, temperature, created } = result[0];
    return {id: id, temperature: temperature, created: created};
  } else {
    return null;
  }
}