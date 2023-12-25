import { Message } from '../../../_types/Message';

export const saveMessageToDb = async(message: Message) => {
  await fetch('/api/endpoints/messages/addMessage', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body:  JSON.stringify({
      message: message
    })
  });
};