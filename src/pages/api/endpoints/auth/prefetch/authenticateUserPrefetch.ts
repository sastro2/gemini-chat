import { NextApiRequest, NextApiResponse } from 'next';
import { DefaultApiResponseBody } from '../../../../../_types/DefaultApiResponseBody';
import { insertError } from '../../../../../methods/dataAccess/errors/INSERT/insertError';
import { confirmAccessServer } from '../../../../../methods/server/confirmAccessServer';

type AuthenticateUserReqBody = {
  accessToken: string;
  username: string;
};

type AuthenticateUserNextApiReq = Omit<NextApiRequest, 'body'> & {
  body: AuthenticateUserReqBody;
};

type AuthenticateUserResponseBody = DefaultApiResponseBody;

const authenticateUserPrefetch = async(req: AuthenticateUserNextApiReq, res: NextApiResponse<AuthenticateUserResponseBody>) => {
  const resBody: AuthenticateUserResponseBody = {auth: false, error: {errorCode: 0, errorId: 0}};

  if(req.method !== 'POST') {res.status(405).send(resBody); return;}

  const { accessToken, username } = req.body;

  await confirmAccessServer(accessToken, res, resBody, username);

  if(!accessToken || !username) {
    const errorId = await insertError(40400, 'Bad request.');
    resBody.error = {errorCode: 40, errorId: errorId? errorId: 0};

    res.status(400).send(resBody);
     return;
  }

  resBody.auth = true;
  res.status(200).send(resBody);
  return;
};

export default authenticateUserPrefetch;