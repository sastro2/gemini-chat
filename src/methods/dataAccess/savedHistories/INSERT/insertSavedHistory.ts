import databaseInstance from '../../db';

export async function insertSavedHistory(historyId: number, accessString: string): Promise<string | null> {

  const result = await databaseInstance`
  INSERT INTO public."savedHistories"(
    "accessString", "historyId")
    VALUES (${accessString}, ${historyId})
    RETURNING "accessString"
  `

  return typeof result[0].accessString === 'string'? result[0].accessString: null
}