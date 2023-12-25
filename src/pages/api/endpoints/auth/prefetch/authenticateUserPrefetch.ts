import { NextApiRequest, NextApiResponse } from 'next';
import { validateAccessOptions } from '../../../../../methods/server/validateAccessOptions';

type AuthenticateUserReqBody = {
  accessToken: string;
  username: string;
};

type AuthenticateUserNextApiReq = Omit<NextApiRequest, 'body'> & {
  body: AuthenticateUserReqBody;
};

type AuthenticateUserResponseBody = {
  auth: boolean;
};

const authenticateUserPrefetch = async(req: AuthenticateUserNextApiReq, res: NextApiResponse<AuthenticateUserResponseBody>) => {
  const resBody: AuthenticateUserResponseBody = {auth: false};

  if(req.method !== 'POST') {res.status(405).send(resBody); return;};

  await validateAccessOptions(req.body.accessToken, res, true, req.body.username);

  const { accessToken, username } = req.body;

  if(!accessToken || !username) {res.status(400).send(resBody); return;};

  resBody.auth = true;
  res.status(200).send(resBody);
  return;
};

export default authenticateUserPrefetch;