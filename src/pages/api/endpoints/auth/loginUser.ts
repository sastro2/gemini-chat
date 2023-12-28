import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import { DefaultApiResponseBody } from '../../../../_types/DefaultApiResponseBody';
import { insertError } from '../../../../methods/dataAccess/errors/INSERT/insertError';
import { selectAccessTokenByUsername } from '../../../../methods/dataAccess/users/SELECT/selectAccessTokenByUsername';
import { selectPasswordByUsername } from '../../../../methods/dataAccess/users/SELECT/selectPasswordByUsername';

type LoginUserReqBody = {
  usernameInput: string;
  passwordInput: string;
};

type LoginUserNextApiReq = Omit<NextApiRequest, 'body'> & {
  body: LoginUserReqBody;
};

export type LoginUserResponseBody = DefaultApiResponseBody;

const verifyPassword = async(inputPassword: string, hashedPassword: string): Promise<boolean> => {
  return bcrypt.compare(inputPassword, hashedPassword);
};

const loginUser = async(req: LoginUserNextApiReq, res: NextApiResponse<LoginUserResponseBody>) => {
  const resBody = {auth: false, error: {errorCode: 0, errorId: 0}};

  if(req.method !== 'POST') {res.status(405).send(resBody); return;}

  const { usernameInput, passwordInput } = req.body;

  // check if username and password are provided
  if(!usernameInput || !passwordInput) {
    const errorId = await insertError(40400, 'Bad request.');
    resBody.error = {errorCode: 40, errorId: errorId? errorId: 0};

    res.status(400).send(resBody);
     return;
  }

  const hashedPassword = await selectPasswordByUsername(usernameInput);

  // check if username exists
  if(!hashedPassword) {res.status(401).send(resBody); return;}

  // check if password is correct
  const passwordCorrect = await verifyPassword(passwordInput, hashedPassword);

  if(!passwordCorrect) {res.status(401).send(resBody); return;}

  const accessToken = await selectAccessTokenByUsername(usernameInput);

  if(!accessToken) {
    const errorId = await insertError(24401, 'Access token not found.');
    resBody.error = {errorCode: 24, errorId: errorId? errorId: 0};

    res.status(401).send(resBody);
    return;
  }

  resBody.auth = true;

  const cookieBody = {accessToken: accessToken, username: usernameInput};

  res.setHeader('Set-Cookie', `accessOptions=${JSON.stringify(cookieBody)}; HttpOnly; Path=/; Expires=Thu, 01 Jan 2100 00:00:00 GMT; SameSite=Strict; Secure=true`).status(200).send(resBody);

  return;
};

export default loginUser;