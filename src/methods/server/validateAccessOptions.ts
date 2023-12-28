import { parse } from 'cookie';
import { NextApiResponse } from 'next';
import { DefaultApiResponseBody } from '../../_types/DefaultApiResponseBody';
import { insertError } from '../dataAccess/errors/INSERT/insertError';
import { selectAccessTokenByUsername } from '../dataAccess/users/SELECT/selectAccessTokenByUsername';
import { accessOptionsGuard } from '../Typeguards/accessOptionsGuard';

export const validateAccessOptions = async(cookie: string | undefined, res: NextApiResponse<DefaultApiResponseBody>, prefetch: boolean, name?: string) => {
  const cookies = parse(cookie || '' );
  const stringifiedAccessOptions = cookies['accessOptions'];

  if(!stringifiedAccessOptions && !prefetch) {
    const errorId = await insertError(20401, 'Access options not found in cookie.');

    res.status(401).end().send({auth: false, error: {errorCode: 20, errorId: errorId? errorId: 0}});
     return;
  }

  const accessOptions: unknown = prefetch? {accessToken: cookie, username: name}: JSON.parse(stringifiedAccessOptions);

  if(!accessOptionsGuard(accessOptions)) {
    const errorId = await insertError(21401, 'Access options not valid.');

    res.status(401).end().send({auth: false, error: {errorCode: 21, errorId: errorId? errorId: 0}});
     return;
  }

  const { accessToken, username } = accessOptions;

  const userAccessToken = await selectAccessTokenByUsername(username);

  if(!userAccessToken) {
    const errorId = await insertError(21401, 'Access token not valid.');

    res.status(401).end().send({auth: false, error: {errorCode: 20, errorId: errorId? errorId: 0}});
     return;
  }
  if(userAccessToken !== accessToken) {
    const errorId = await insertError(21401, 'Access token not valid.');

    res.status(401).end().send({auth: false, error: {errorCode: 20, errorId: errorId? errorId: 0}});
     return;
  }

  return {accessToken, username};
};