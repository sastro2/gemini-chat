import databaseInstance from '../../db';

export async function selectSavedHistoryByHistoryId(historyId: number): Promise<{accessString: string, msgCount: number}[]> {

  const result = await databaseInstance`
  SELECT "accessString", "msgCount"
  FROM public."savedHistories"
  WHERE "historyId" = ${historyId}
  `

  const confirmedSavedHistory: {accessString: string, msgCount: number}[] = [];

  result.forEach((row) => {
    if('accessString' in row && typeof row.accessString === 'string' && 'msgCount' in row && typeof row.msgCount === 'number'){
      confirmedSavedHistory.push({accessString: row.accessString, msgCount: row.msgCount});
    }
  });

  return confirmedSavedHistory;
}