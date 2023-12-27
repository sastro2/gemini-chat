import { NextApiRequest, NextApiResponse } from 'next';
import { Error } from '../../../../_types/Error';
import { Message } from '../../../../_types/Message';
import { insertMessage } from '../../../../methods/dataAccess/messages/INSERT/insertMessage';
import { validateAccessOptions } from '../../../../methods/server/validateAccessOptions';

type AddMessageReqBody = {
  message: Message;
};

type AddMessageNextApiReq = Omit<NextApiRequest, 'body'> & {
  body: AddMessageReqBody;
};

type AddMessageNextApiResponseBody = {
  error: Error;
};

const addMessage = async(req: AddMessageNextApiReq, res: NextApiResponse<AddMessageNextApiResponseBody>) => {
  const resBody: AddMessageNextApiResponseBody = {error: {errorId: 0, errorCode: 0}};

  if(req.method !== 'POST') {res.status(405); return;};

  const accessOptions = await validateAccessOptions(req.headers.cookie, res, false);

  if(!accessOptions?.accessToken ||!accessOptions.username) {
    return;
  }

  const { message } = req.body;

  await insertMessage(message);

  res.status(200).send(resBody);
  return;
};

export default addMessage;