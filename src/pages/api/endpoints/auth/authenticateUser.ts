import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import { selectAccessTokenByUsername } from '../../dataAccess/users/SELECT/selectAccessTokenByUsername';
import { selectPasswordByUsername } from '../../dataAccess/users/SELECT/selectPasswordByUsername';

type AuthenticateUserReqBody = {
  usernameInput: string;
  passwordInput: string;
};

type AuthenticateUserNextApiReq = Omit<NextApiRequest, 'body'> & {
  body: AuthenticateUserReqBody;
};

type AuthenticateUserResponseBody = {
  auth: boolean;
}

const verifyPassword = async(inputPassword: string, hashedPassword: string): Promise<boolean> => {
  return bcrypt.compare(inputPassword, hashedPassword);
};

const handleAuthenticateUser = async(req: AuthenticateUserNextApiReq, res: NextApiResponse<AuthenticateUserResponseBody>) => {
  if(req.method !== 'POST') {res.status(405); return;};

  const resBody = {auth: false};

  const { usernameInput, passwordInput } = req.body;

  if(!usernameInput || !passwordInput) {res.status(400).send(resBody); return;};

  const hashedPassword = await selectPasswordByUsername(usernameInput);

  if(!hashedPassword) {res.status(401).send(resBody); return;};

  const passwordCorrect = await verifyPassword(passwordInput, hashedPassword);

  if(!passwordCorrect) {res.status(401).send(resBody); return;};

  const accessToken = await selectAccessTokenByUsername(usernameInput);

  if(!accessToken) {res.status(401).send(resBody); return;};

  resBody.auth = true;

  res.setHeader('Set-Cookie', `accessToken=${accessToken}; HttpOnly; Path=/; SameSite=Strict; Secure=true`).status(200).send(resBody);

  return;
};

export default handleAuthenticateUser;