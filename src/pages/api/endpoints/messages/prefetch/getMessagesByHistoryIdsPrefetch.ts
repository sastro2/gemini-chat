import { NextApiRequest, NextApiResponse } from 'next';
import { Message } from '../../../../../_types/Message';
import { selectMessagesByHistoryIds } from '../../../../../methods/dataAccess/messages/SELECT/selectMessagesByHistoryIds';
import { validateAccessOptions } from '../../../../../methods/server/validateAccessOptions';

type GetAllMessagesReqBody = {
  accessToken: string;
  username: string;
  historyIds: number[];
};

type GetAllMessagesNextApiReq = Omit<NextApiRequest, 'body'> & {
  body: GetAllMessagesReqBody;
};

type GetAllMessagesResponseBody = {
  messages: Message[] | null;
};

const getAllMessagesByHistoryIdsPrefetch = async(req: GetAllMessagesNextApiReq, res: NextApiResponse<GetAllMessagesResponseBody>) => {
  const resBody: GetAllMessagesResponseBody = {messages: null};

  if(req.method !== 'POST') {res.status(405).send(resBody); return;};

  await validateAccessOptions(req.body.accessToken, res, true, req.body.username);

  const { historyIds } = req.body;

  if(!req.body.historyIds) {res.status(400).send(resBody); return;};

  const userMessages = await selectMessagesByHistoryIds(historyIds);

  resBody.messages = userMessages;
  res.status(200).send(resBody);
  return;
};

export default getAllMessagesByHistoryIdsPrefetch;