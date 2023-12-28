import { dbHistoryGuard } from '../../../Typeguards/dbHistoryGuard';
import { DbHistory } from '../../_models/dbHistory';
import databaseInstance from '../../db';

export async function selectAllHistoriesByUserId(userId: number): Promise<DbHistory[]> {
  const result = await databaseInstance`
    SELECT
      id, temperature, created
    FROM histories
    WHERE "userId" = ${userId}
  `

  if(result.count === 0) return [];

  const histories: DbHistory[] = []

  result.forEach((row) => {
    if(dbHistoryGuard(row)) histories.push(row);
  })

  return histories;
}