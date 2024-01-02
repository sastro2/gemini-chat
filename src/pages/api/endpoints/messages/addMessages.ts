import { NextApiRequest, NextApiResponse } from 'next';
import { DefaultApiResponseBody } from '../../../../_types/DefaultApiResponseBody';
import { Message } from '../../../../_types/Message';
import { insertMessages } from '../../../../methods/dataAccess/messages/INSERT/insertMessage';
import { validateAccessOptions } from '../../../../methods/server/validateAccessOptions';

type AddMessageReqBody = {
  messages: Message[];
  created: number [];
};

type AddMessageNextApiReq = Omit<NextApiRequest, 'body'> & {
  body: AddMessageReqBody;
};

type AddMessageNextApiResponseBody = DefaultApiResponseBody;

const addMessages = async(req: AddMessageNextApiReq, res: NextApiResponse<AddMessageNextApiResponseBody>) => {
  const resBody: AddMessageNextApiResponseBody = {auth: false, error: {errorId: 0, errorCode: 0}};

  if(req.method !== 'POST') {res.status(405); return;}

  const accessOptions = await validateAccessOptions(req.headers.cookie, res, false);

  if(!accessOptions?.accessToken ||!accessOptions.username) {
    return;
  }

  resBody.auth = true;

  const { messages, created } = req.body;

  await insertMessages(messages, created);

  res.status(200).send(resBody);
  return;
};

export default addMessages;