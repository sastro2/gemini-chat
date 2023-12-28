import { Message } from '../../../../_types/Message';
import { messageGuard } from '../../../Typeguards/messageGuard';
import databaseInstance from '../../db';

export async function selectMessagesByHistoryIds(historyIds: number[]) {
  const result = await databaseInstance`
    SELECT
      *
    FROM messages
    WHERE "historyId" IN ${ databaseInstance(historyIds) }
  `

  const messages: Message[] = [];

  result.forEach((message) => {
    if(messageGuard(message)){
      messages.push(message)
    }
  })

  return messages
}