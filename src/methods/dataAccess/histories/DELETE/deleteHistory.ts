import databaseInstance from '../../db';

export async function deleteHistory(id: number, userId: number): Promise<number> {
  const result = await databaseInstance`
    DELETE FROM public.histories
    WHERE id = ${id} AND "userId" = ${userId}
    RETURNING id
  `

  return typeof result[0].id === 'number'? result[0].id: -1;
}