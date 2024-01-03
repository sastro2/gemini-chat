import databaseInstance from '../../db';

export async function selectSavedHistoryByAccessString(accessString: string): Promise<{historyId: number, msgCount: number} | null> {

  const result = await databaseInstance`
  SELECT "historyId", "msgCount"
  FROM public."savedHistories"
  WHERE "accessString" = ${accessString}
  `

  if(result[0] && 'historyId' in result[0] && typeof result[0].historyId === 'number' && 'msgCount' in result[0] && typeof result[0].msgCount === 'number') {
    return {historyId: result[0].historyId, msgCount: result[0].msgCount};
  }

  return null;
}