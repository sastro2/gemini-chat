import { History } from '../../../../_types/History';
import databaseInstance from '../../db';

export async function selectAllHistoriesByUserId(userId: number): Promise<History[] | null> {
  const result = await databaseInstance`
    SELECT
      *
    FROM histories
    WHERE "userId" = ${userId}
  `

  const histories = result.map(history => {
    return {id: history.id, temperature: history.temperature, messages: [], created: history.created};
  });
  return histories;
};