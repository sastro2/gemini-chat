import { NextApiRequest, NextApiResponse } from 'next';
import { History } from '../../../../../_types/History';
import { validateAccessOptions } from '../../../../../methods/server/validateAccessOptions';
import { selectAllHistoriesByUserId } from '../../../dataAccess/histories/SELECT/selectAllHistoriesByUserId';
import { selectAccessTokenByUsername } from '../../../dataAccess/users/SELECT/selectAccessTokenByUsername';
import { selectUserIdByUsername } from '../../../dataAccess/users/SELECT/selectUserIdByUsername';

type GetAllHistoriesReqBody = {
  accessToken: string;
  username: string;
};

type GetAllHistoriesNextApiReq = Omit<NextApiRequest, 'body'> & {
  body: GetAllHistoriesReqBody;
};

type GetAllHistoriesResponseBody = {
  history: History[] | null;
};

const getAllHistoriesPrefetch = async(req: GetAllHistoriesNextApiReq, res: NextApiResponse<GetAllHistoriesResponseBody>) => {
  const resBody: GetAllHistoriesResponseBody = {history: null};

  if(req.method !== 'POST') {res.status(405).send(resBody); return;};

  await validateAccessOptions(req.body.accessToken, res, true, req.body.username);

  const { accessToken, username } = req.body;

  if(!req.body.accessToken) {res.status(400).send(resBody); return;};

  const userAccessToken = await selectAccessTokenByUsername(username);

  if(!userAccessToken) {res.status(401).send(resBody); return;}
  if(userAccessToken !== accessToken) {res.status(401).send(resBody); return;}

  const userId = await selectUserIdByUsername(username);

  if(!userId) {res.status(401).send(resBody); return;}

  const histories = await selectAllHistoriesByUserId(userId);

  if(!histories) {res.status(500).send(resBody); return;}

  resBody.history = histories;
  res.status(200).send(resBody);
  return;
};

export default getAllHistoriesPrefetch;