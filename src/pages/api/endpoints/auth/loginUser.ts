import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import { selectAccessTokenByUsername } from '../../dataAccess/users/SELECT/selectAccessTokenByUsername';
import { selectPasswordByUsername } from '../../dataAccess/users/SELECT/selectPasswordByUsername';

type LoginUserReqBody = {
  usernameInput: string;
  passwordInput: string;
};

type LoginUserNextApiReq = Omit<NextApiRequest, 'body'> & {
  body: LoginUserReqBody;
};

type LoginUserResponseBody = {
  auth: boolean;
};

const verifyPassword = async(inputPassword: string, hashedPassword: string): Promise<boolean> => {
  return bcrypt.compare(inputPassword, hashedPassword);
};

const loginUser = async(req: LoginUserNextApiReq, res: NextApiResponse<LoginUserResponseBody>) => {
  const resBody = {auth: false};

  if(req.method !== 'POST') {res.status(405).send(resBody); return;};

  const { usernameInput, passwordInput } = req.body;

  if(!usernameInput || !passwordInput) {res.status(400).send(resBody); return;};

  const hashedPassword = await selectPasswordByUsername(usernameInput);

  if(!hashedPassword) {res.status(401).send(resBody); return;};

  const passwordCorrect = await verifyPassword(passwordInput, hashedPassword);

  if(!passwordCorrect) {res.status(401).send(resBody); return;};

  const accessToken = await selectAccessTokenByUsername(usernameInput);

  if(!accessToken) {res.status(401).send(resBody); return;};

  resBody.auth = true;

  const cookieBody = {accessToken: accessToken, username: usernameInput};

  res.setHeader('Set-Cookie', `accessOptions=${JSON.stringify(cookieBody)}; HttpOnly; Path=/; Expires=Thu, 01 Jan 2100 00:00:00 GMT; SameSite=Strict; Secure=true`).status(200).send(resBody);

  return;
};

export default loginUser;