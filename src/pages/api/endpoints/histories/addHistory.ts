import { NextApiRequest, NextApiResponse } from 'next';
import { History } from '../../../../_types/History';
import { validateAccessOptions } from '../../../../methods/server/validateAccessOptions';
import { insertHistory } from '../../dataAccess/histories/INSERT/insertHistory';
import { selectAccessTokenByUsername } from '../../dataAccess/users/SELECT/selectAccessTokenByUsername';
import { selectUserIdByUsername } from '../../dataAccess/users/SELECT/selectUserIdByUsername';

type AddHistoryReqBody = {
  historyTemperature: number;
};

type AddHistoryNextApiReq = Omit<NextApiRequest, 'body'> & {
  body: AddHistoryReqBody;
};

type AddHistoryResponseBody = {
  history: History | null;
};

const addHistory = async(req: AddHistoryNextApiReq, res: NextApiResponse<AddHistoryResponseBody>) => {
  const resBody: AddHistoryResponseBody = {history: null};

  if(req.method !== 'POST') {res.status(405).send(resBody); return;};

  const accessOptions = await validateAccessOptions(req.headers.cookie, res, false);

  if(!accessOptions) {res.status(401).send(resBody); return;}

  const { historyTemperature } = req.body;

  const userAccessToken = await selectAccessTokenByUsername(accessOptions.username);

  if(!userAccessToken) {res.status(401).send(resBody); return;}
  if(userAccessToken !== accessOptions?.accessToken) {res.status(401).send(resBody); return;}

  const userId = await selectUserIdByUsername(accessOptions.username);

  if(!userId) {res.status(401).send(resBody); return;}

  const history = await insertHistory(userId, new Date(), historyTemperature);

  if(!history) {res.status(500).send(resBody); return;}

  resBody.history = history;
  res.status(200).send(resBody);
  return;
};

export default addHistory;