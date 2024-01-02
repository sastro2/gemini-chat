import databaseInstance from '../../db';

export async function deleteMessages(historyId: number) {
  await databaseInstance`
    DELETE FROM messages
    WHERE "historyId" = ${historyId}
  `
}