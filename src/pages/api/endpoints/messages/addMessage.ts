import { NextApiRequest, NextApiResponse } from 'next';
import { Message } from '../../../../_types/Message';
import { insertMessage } from '../../../../methods/dataAccess/messages/INSERT/insertMessage';
import { validateAccessOptions } from '../../../../methods/server/validateAccessOptions';

type AddMessageReqBody = {
  message: Message;
};

type AddMessageNextApiReq = Omit<NextApiRequest, 'body'> & {
  body: AddMessageReqBody;
};

const addMessage = async(req: AddMessageNextApiReq, res: NextApiResponse) => {
  if(req.method !== 'POST') {res.status(405); return;};

  await validateAccessOptions(req.headers.cookie, res, false);

  const { message } = req.body;

  insertMessage(message);

  res.status(200).send('');
  return;
};

export default addMessage;