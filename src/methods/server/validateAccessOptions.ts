import { parse } from 'cookie';
import { NextApiResponse } from 'next';
import { AccessOptions } from '../../_types/AccessOptions';
import { selectAccessTokenByUsername } from '../dataAccess/users/SELECT/selectAccessTokenByUsername';

export const validateAccessOptions = async(cookie: string | undefined, res: NextApiResponse<any>, prefetch: boolean, name?: string) => {
  const cookies = parse(cookie || '' );
  const stringifiedAccessOptions = cookies['accessOptions'];

  if(!stringifiedAccessOptions) {res.status(401); return;}

  const accessOptions: AccessOptions = prefetch? {accessToken: cookie, username: name}: JSON.parse(stringifiedAccessOptions);

  const { accessToken, username } = accessOptions;

  const userAccessToken = await selectAccessTokenByUsername(username);

  if(!userAccessToken) {res.status(401); return;}
  if(userAccessToken !== accessToken) {res.status(401); return;}

  return {accessToken, username};
};