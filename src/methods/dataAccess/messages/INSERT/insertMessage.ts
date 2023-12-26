import { Message } from '../../../../_types/Message';
import databaseInstance from '../../db';

export async function insertMessage(message: Message) {
  const result = await databaseInstance`
    INSERT INTO messages(created, "historyId", parts, "initialPrint", role)
    VALUES(${new Date()}, ${message.historyId}, ${message.parts}, ${message.initialPrint}, ${message.role})
  `
};