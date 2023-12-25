import { NextApiRequest, NextApiResponse } from 'next';
import { validateAccessOptions } from '../../../../methods/server/validateAccessOptions';

type AuthenticateUserReqBody = {
};

type AuthenticateUserNextApiReq = Omit<NextApiRequest, 'body'> & {
  body: AuthenticateUserReqBody;
};

type AuthenticateUserResponseBody = {
  auth: boolean;
};

const authenticateUser = async(req: AuthenticateUserNextApiReq, res: NextApiResponse<AuthenticateUserResponseBody>) => {
  const resBody: AuthenticateUserResponseBody = {auth: false};

  if(req.method !== 'POST') {res.status(405).send(resBody); return;};

  await validateAccessOptions(req.headers.cookie, res, false);

  resBody.auth = true;
  res.status(200).send(resBody);
  return;
};

export default authenticateUser;