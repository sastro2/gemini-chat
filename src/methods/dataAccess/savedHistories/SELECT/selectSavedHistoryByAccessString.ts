import databaseInstance from '../../db';

export async function selectSavedHistoryByAccessString(accessString: string): Promise<number | null> {

  const result = await databaseInstance`
  SELECT "historyId"
  FROM public."savedHistories"
  WHERE "accessString" = ${accessString}
  `

  if(result[0] && 'historyId' in result[0] && typeof result[0].historyId === 'number') return result[0].historyId

  return null;
}