import { NextApiRequest, NextApiResponse } from 'next';
import { AccessOptions } from '../../../../_types/AccessOptions';
import { Error } from '../../../../_types/Error';
import { History } from '../../../../_types/History';
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

type AddHistoryResponseBody = {
  error: Error;
  history: History | null;
};

const addHistory = async(req: AddHistoryNextApiReq, res: NextApiResponse<AddHistoryResponseBody>) => {
  const resBody: AddHistoryResponseBody = {history: null, error: {errorCode: 0, errorId: 0}};

  if(req.method !== 'POST') {res.status(405).send(resBody); return;};

  const accessOptions = await validateAccessOptions(req.headers.cookie, res, false);

  if(!accessOptions?.accessToken ||!accessOptions.username) {
    return;
  }

  const userAccessToken = await selectAccessTokenByUsername(accessOptions.username);
  await checkUserAccessToken(userAccessToken, res, accessOptions);

  const { historyTemperature } = req.body;

  const userId = await selectUserIdByUsername(accessOptions.username);

  if(!userId) {res.status(401).send(resBody); return;}

  const history = await insertHistory(userId, new Date(), historyTemperature);

  if(!history) {res.status(500).send(resBody); return;}

  resBody.history = history;
  res.status(200).send(resBody);
  return;
};

export default addHistory;