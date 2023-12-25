import { NextApiRequest, NextApiResponse } from 'next';
import { selectAccessTokenByUsername } from '../../dataAccess/users/SELECT/selectAccessTokenByUsername';

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

const authenticateUser = async(req: AuthenticateUserNextApiReq, res: NextApiResponse<AuthenticateUserResponseBody>) => {
  const resBody: AuthenticateUserResponseBody = {auth: false};

  if(req.method !== 'POST') {res.status(405).send(resBody); return;};

  const { accessToken, username } = req.body;

  if(!accessToken || !username) {res.status(400).send(resBody); return;};

  const userAccessToken = await selectAccessTokenByUsername(username);

  if(!userAccessToken) {res.status(401).send(resBody); return;}
  if(userAccessToken !== accessToken) {res.status(401).send(resBody); return;}

  resBody.auth = true;
  res.status(200).send(resBody);
  return;
};

export default authenticateUser;