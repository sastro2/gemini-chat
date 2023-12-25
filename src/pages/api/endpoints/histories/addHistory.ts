import { parse } from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';
import { History } from '../../../../_types/History';
import { insertHistory } from '../../dataAccess/users/INSERT/insertHistory';
import { selectAccessTokenByUsername } from '../../dataAccess/users/SELECT/selectAccessTokenByUsername';
import { selectUserIdByUsername } from '../../dataAccess/users/SELECT/selectUserIdByUsername';

type AccessOptions = {
  accessToken: string;
  username: string;
};

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

  const cookies = parse(req.headers.cookie || '' );
  const stringifiedAccessOptions = cookies['accessOptions'];
  const accessOptions: AccessOptions = JSON.parse(stringifiedAccessOptions);
  const { historyTemperature } = req.body;

  if(!accessOptions.accessToken) {res.status(400).send(resBody); return;};

  const { accessToken, username } = accessOptions;

  const userAccessToken = await selectAccessTokenByUsername(username);

  if(!userAccessToken) {res.status(401).send(resBody); return;}
  if(userAccessToken !== accessToken) {res.status(401).send(resBody); return;}

  const userId = await selectUserIdByUsername(username);

  if(!userId) {res.status(401).send(resBody); return;}

  const history = await insertHistory(userId, new Date(), historyTemperature);

  if(!history) {res.status(500).send(resBody); return;}

  resBody.history = history;
  res.status(200).send(resBody);
  return;
};

export default addHistory;