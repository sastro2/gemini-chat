import { NextApiRequest, NextApiResponse } from 'next';
import { DefaultApiResponseBody } from '../../../../_types/DefaultApiResponseBody';
import { validateAccessOptions } from '../../../../methods/server/validateAccessOptions';

type AuthenticateUserResponseBody = DefaultApiResponseBody

const authenticateUser = async(req: NextApiRequest, res: NextApiResponse<AuthenticateUserResponseBody>) => {
  const resBody: AuthenticateUserResponseBody = {auth: false, error: {errorId: 0, errorCode: 0}};

  if(req.method !== 'POST') {res.status(405).send(resBody); return;}

  const accessOptions = await validateAccessOptions(req.headers.cookie, res, false);

  if(!accessOptions?.accessToken ||!accessOptions.username) {
    return;
  }

  resBody.auth = true;
  res.status(200).send(resBody);
  return;
};

export default authenticateUser;