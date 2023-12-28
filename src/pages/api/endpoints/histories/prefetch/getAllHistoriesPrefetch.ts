import { NextApiRequest, NextApiResponse } from 'next';
import { DefaultApiResponseBody } from '../../../../../_types/DefaultApiResponseBody';
import { DbHistory } from '../../../../../methods/dataAccess/_models/dbHistory';
import { insertError } from '../../../../../methods/dataAccess/errors/INSERT/insertError';
import { selectAllHistoriesByUserId } from '../../../../../methods/dataAccess/histories/SELECT/selectAllHistoriesByUserId';
import { selectAccessTokenByUsername } from '../../../../../methods/dataAccess/users/SELECT/selectAccessTokenByUsername';
import { selectUserIdByUsername } from '../../../../../methods/dataAccess/users/SELECT/selectUserIdByUsername';
import { checkUserAccessToken } from '../../../../../methods/server/checkUserAccessToken';
import { validateAccessOptions } from '../../../../../methods/server/validateAccessOptions';

type GetAllHistoriesReqBody = {
  accessToken: string;
  username: string;
};

type GetAllHistoriesNextApiReq = Omit<NextApiRequest, 'body'> & {
  body: GetAllHistoriesReqBody;
};

type GetAllHistoriesResponseBody = DefaultApiResponseBody & {
  history?: DbHistory[] | null;
};

const getAllHistoriesPrefetch = async(req: GetAllHistoriesNextApiReq, res: NextApiResponse<GetAllHistoriesResponseBody>) => {
  const resBody: GetAllHistoriesResponseBody = {auth: false, history: null, error: {errorCode: 0, errorId: 0}};

  if(req.method !== 'POST') {res.status(405).send(resBody); return;}

  const accessOptions = await validateAccessOptions(req.body.accessToken, res, true, req.body.username);

  if(!accessOptions?.accessToken ||!accessOptions.username) {
    return;
  }

  const { accessToken, username } = req.body;

  if(!req.body.accessToken) {
    const errorId = await insertError(22400, 'Bad auth request.');
    resBody.error = {errorCode: 22, errorId: errorId? errorId: 0};

    res.status(400).send(resBody);
    return;
}

  const userAccessToken = await selectAccessTokenByUsername(username);

  await checkUserAccessToken(userAccessToken, res, {accessToken, username});

  const userId = await selectUserIdByUsername(username);

  if(!userId) {
    const errorId = await insertError(30401, 'User not found.');
    resBody.error = {errorCode: 30, errorId: errorId? errorId: 0};

    res.status(401).send(resBody);
    return;
  }

  const histories = await selectAllHistoriesByUserId(userId);

  resBody.auth = true;
  if(!histories) {res.status(200).send(resBody); return;}

  resBody.history = histories;
  res.status(200).send(resBody);
  return;
};

export default getAllHistoriesPrefetch;