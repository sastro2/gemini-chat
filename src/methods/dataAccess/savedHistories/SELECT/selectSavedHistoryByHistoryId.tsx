import databaseInstance from '../../db';

export async function selectSavedHistoryByHistoryId(historyId: number): Promise<string | null> {

  const result = await databaseInstance`
  SELECT "accessString"
  FROM public."savedHistories"
  WHERE "historyId" = ${historyId}
  `

  if(result[0] && 'accessString' in result[0] && typeof result[0].accessString === 'string') return result[0].accessString

  return null;
}