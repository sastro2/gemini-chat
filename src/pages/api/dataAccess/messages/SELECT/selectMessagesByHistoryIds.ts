import { Message } from '../../../../../_types/Message';
import databaseInstance from '../../db';

export async function selectMessagesByHistoryIds(historyIds: number[]) {
  const result = await databaseInstance`
    SELECT
      *
    FROM messages
    WHERE "historyId" IN ${ databaseInstance(historyIds) }
  `

  const messages: Message[] = result.map((message) => {
    return {historyId: message.historyId, parts: message.parts, role: message.role, initialPrint: message.initialPrint}
  })
  return messages
};