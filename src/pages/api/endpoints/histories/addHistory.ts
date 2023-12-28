import { NextApiRequest, NextApiResponse } from 'next';
import { DefaultApiResponseBody } from '../../../../_types/DefaultApiResponseBody';
import { DbHistory } from '../../../../methods/dataAccess/_models/dbHistory';
import { insertError } from '../../../../methods/dataAccess/errors/INSERT/insertError';
import { insertHistory } from '../../../../methods/dataAccess/histories/INSERT/insertHistory';
import { selectAccessTokenByUsername } from '../../../../methods/dataAccess/users/SELECT/selectAccessTokenByUsername';
import { selectUserIdByUsername } from '../../../../methods/dataAccess/users/SELECT/selectUserIdByUsername';
import { checkUserAccessToken } from '../../../../methods/server/checkUserAccessToken';
import { validateAccessOptions } from '../../../../methods/server/validateAccessOptions';

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

  const accessOptions = await validateAccessOptions(req.headers.cookie, res, false);

  if(!accessOptions?.accessToken ||!accessOptions.username) {
    return;
  }

  const userAccessToken = await selectAccessTokenByUsername(accessOptions.username);
  await checkUserAccessToken(userAccessToken, res, accessOptions);

  const { historyTemperature } = req.body;

  const userId = await selectUserIdByUsername(accessOptions.username);

  if(!userId) {
    const errorId = await insertError(30401, 'User not found.');
    resBody.error = {errorCode: 30, errorId: errorId? errorId: 0};

    res.status(401).send(resBody);
    return;
  }

  resBody.auth = true;

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