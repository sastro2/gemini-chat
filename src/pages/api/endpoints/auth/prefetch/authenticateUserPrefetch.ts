import { NextApiRequest, NextApiResponse } from 'next';
import { Error } from '../../../../../_types/Error';
import { insertError } from '../../../../../methods/dataAccess/errors/INSERT/insertError';
import { validateAccessOptions } from '../../../../../methods/server/validateAccessOptions';

type AuthenticateUserReqBody = {
  accessToken: string;
  username: string;
};

type AuthenticateUserNextApiReq = Omit<NextApiRequest, 'body'> & {
  body: AuthenticateUserReqBody;
};

type AuthenticateUserResponseBody = {
  error: Error;
  auth: boolean;
};

const authenticateUserPrefetch = async(req: AuthenticateUserNextApiReq, res: NextApiResponse<AuthenticateUserResponseBody>) => {
  const resBody: AuthenticateUserResponseBody = {auth: false, error: {errorCode: 0, errorId: 0}};

  if(req.method !== 'POST') {res.status(405).send(resBody); return;};

  const accessOptions = await validateAccessOptions(req.body.accessToken, res, true, req.body.username);

  if(!accessOptions?.accessToken ||!accessOptions.username) {
    return;
  }

  const { accessToken, username } = req.body;

  if(!accessToken || !username) {
    const errorId = await insertError(22400, 'Bad auth request.');
    resBody.error = {errorCode: 22, errorId: errorId? errorId: 0};

    res.status(400).send(resBody);
     return;
  };

  resBody.auth = true;
  res.status(200).send(resBody);
  return;
};

export default authenticateUserPrefetch;