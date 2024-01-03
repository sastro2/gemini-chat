import databaseInstance from '../../db';

export async function insertSavedHistory(historyId: number, accessString: string, msgCount: number): Promise<string | null> {

  const result = await databaseInstance`
  INSERT INTO public."savedHistories"(
    "accessString", "historyId", "msgCount")
    VALUES (${accessString}, ${historyId}, ${msgCount})
    RETURNING "accessString"
  `

  return typeof result[0].accessString === 'string'? result[0].accessString: null
}