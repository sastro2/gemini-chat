import { NextApiRequest, NextApiResponse } from 'next';
import { DefaultApiResponseBody } from '../../../../_types/DefaultApiResponseBody';
import { DbHistory } from '../../../../methods/dataAccess/_models/dbHistory';
import { insertError } from '../../../../methods/dataAccess/errors/INSERT/insertError';
import { insertHistory } from '../../../../methods/dataAccess/histories/INSERT/insertHistory';
import { confirmAccessClient } from '../../../../methods/server/confirmAccessClient';

type AddHistoryReqBody = {
  historyTemperature: number;
};

type AddHistoryNextApiReq = Omit<NextApiRequest, 'body'> & {
  body: AddHistoryReqBody;
};

export type AddHistoryResponseBody = DefaultApiResponseBody & {
  history?: DbHistory | null;
};

const addHistory = async(req: AddHistoryNextApiReq, res: NextApiResponse<AddHistoryResponseBody>) => {
  const resBody: AddHistoryResponseBody = {auth: false, history: null, error: {errorCode: 0, errorId: 0}};

  if(req.method !== 'POST') {res.status(405).send(resBody); return;}

  const userId = await confirmAccessClient(req.headers.cookie, res, resBody);

  const { historyTemperature } = req.body;

  const history = await insertHistory(userId, new Date(), historyTemperature);

  if(!history) {
    const errorId = await insertError(50500, 'Internal server error.');
    resBody.error = {errorCode: 50, errorId: errorId? errorId: 0};

    res.status(500).send(resBody);
    return;
  }

  resBody.history = history;
  res.status(200).send(resBody);
  return;
};

export default addHistory;