import { NextApiRequest, NextApiResponse } from 'next';
import { DefaultApiResponseBody } from '../../../../_types/DefaultApiResponseBody';
import { deleteHistory } from '../../../../methods/dataAccess/histories/DELETE/deleteHistory';
import { deleteMessages } from '../../../../methods/dataAccess/messages/DELETE/deleteMessages';
import { confirmAccessClient } from '../../../../methods/server/confirmAccessClient';

type DeleteHistoryReqBody = {
  historyId: number;
};

type DeleteHistoryNextApiReq = Omit<NextApiRequest, 'body'> & {
  body: DeleteHistoryReqBody;
};

export type DeleteHistoryResponseBody = DefaultApiResponseBody

const removeHistory = async(req: DeleteHistoryNextApiReq, res: NextApiResponse<DeleteHistoryResponseBody>) => {
  const resBody: DeleteHistoryResponseBody = {auth: false, error: {errorCode: 0, errorId: 0}};

  if(req.method !== 'DELETE') {res.status(405).send(resBody); return;}

  const userId = await confirmAccessClient(req.headers.cookie, res, resBody);

  resBody.auth = true;

  const { historyId } = req.body;

  const id = await deleteHistory(historyId, userId);
  if(id !== -1) await deleteMessages(id);

  res.status(200).send(resBody);
  return;
};

export default removeHistory;