import { Message } from '../../../../_types/Message';
import databaseInstance from '../../db';

export async function insertMessages(messages: Message[], created: number[]) {
  const db = databaseInstance;

  let index = 0;

  for await (const message of messages) {
    await db`
    INSERT INTO messages(created, "historyId", parts, "initialPrint", role)
    VALUES(${created[index]}, ${message.historyId}, ${message.parts}, ${message.initialPrint}, ${message.role})
  `
  index ++
  }
}