import { NextApiRequest, NextApiResponse } from 'next';
import { DefaultApiResponseBody } from '../../../../_types/DefaultApiResponseBody';
import { Message } from '../../../../_types/Message';
import { insertError } from '../../../../methods/dataAccess/errors/INSERT/insertError';
import { selectMessagesByHistoryIds } from '../../../../methods/dataAccess/messages/SELECT/selectMessagesByHistoryIds';
import { validateAccessOptions } from '../../../../methods/server/validateAccessOptions';

type GetAllMessagesReqBody = {
  historyIds: number[];
};

type GetAllMessagesNextApiReq = Omit<NextApiRequest, 'body'> & {
  body: GetAllMessagesReqBody;
};

type GetAllMessagesResponseBody = DefaultApiResponseBody & {
  messages?: Message[] | null;
};

const getMessagesByHistoryIds = async(req: GetAllMessagesNextApiReq, res: NextApiResponse<GetAllMessagesResponseBody>) => {
  const resBody: GetAllMessagesResponseBody = {auth: false, messages: null, error: {errorCode: 0, errorId: 0}};

  if(req.method !== 'POST') {res.status(405).send(resBody); return;}

  const accessOptions = await validateAccessOptions(req.headers.cookie, res, false);

  if(!accessOptions?.accessToken ||!accessOptions.username) {
    return;
  }

  const { historyIds } = req.body;

  if(!req.body.historyIds) {
    const errorId = await insertError(40400, 'Bad request.');
    resBody.error = {errorCode: 40, errorId: errorId? errorId: 0};

    res.status(400).send(resBody);
    return;
  }

  const userMessages = await selectMessagesByHistoryIds(historyIds);

  resBody.auth = true;
  resBody.messages = userMessages;
  res.status(200).send(resBody);
  return;
};

export default getMessagesByHistoryIds;