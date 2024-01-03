import { NextApiRequest, NextApiResponse } from 'next';
import { DefaultApiResponseBody } from '../../../../_types/DefaultApiResponseBody';
import { confirmAccessClient } from '../../../../methods/server/confirmAccessClient';

type AuthenticateUserResponseBody = DefaultApiResponseBody

const authenticateUser = async(req: NextApiRequest, res: NextApiResponse<AuthenticateUserResponseBody>) => {
  const resBody: AuthenticateUserResponseBody = {auth: false, error: {errorId: 0, errorCode: 0}};

  if(req.method !== 'POST') {res.status(405).send(resBody); return;}

  await confirmAccessClient(req.headers.cookie, res, resBody);

  resBody.auth = true;
  res.status(200).send(resBody);
  return;
};

export default authenticateUser;