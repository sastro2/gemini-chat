import { NextApiResponse } from 'next';
import { DefaultApiResponseBody } from '../../_types/DefaultApiResponseBody';
import { insertError } from '../dataAccess/errors/INSERT/insertError';
import { selectAccessTokenByUsername } from '../dataAccess/users/SELECT/selectAccessTokenByUsername';
import { selectUserIdByUsername } from '../dataAccess/users/SELECT/selectUserIdByUsername';
import { checkUserAccessToken } from './checkUserAccessToken';
import { validateAccessOptions } from './validateAccessOptions';

export const confirmAccessClient = async(cookie: string | undefined, res: NextApiResponse<DefaultApiResponseBody>, resBody: DefaultApiResponseBody): Promise<number> => {
  const accessOptions = await validateAccessOptions(cookie, res, false);

  if(!accessOptions?.accessToken ||!accessOptions.username) {
    return -1;
  }

  const userAccessToken = await selectAccessTokenByUsername(accessOptions.username);
  await checkUserAccessToken(userAccessToken, res, accessOptions);

  const userId = await selectUserIdByUsername(accessOptions.username);

  if(!userId) {
    const errorId = await insertError(30401, 'User not found.');
    resBody.error = {errorCode: 30, errorId: errorId? errorId: 0};

    res.status(401).send(resBody);
    return -1;
  }

  resBody.auth = true;

  return userId;
}