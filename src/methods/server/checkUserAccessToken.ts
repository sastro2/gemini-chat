import { NextApiResponse } from 'next';
import { AccessOptions } from '../../_types/AccessOptions';
import { insertError } from '../dataAccess/errors/INSERT/insertError';

export const checkUserAccessToken = async(userAccessToken: string | null, res: NextApiResponse, accessOptions: AccessOptions) => {
  const resBody = {error: {errorCode: 0, errorId: 0}};

  if(!userAccessToken) {
    const errorId = await insertError(24401, 'Access token not found.');
    resBody.error = {errorCode: 24, errorId: errorId? errorId: 0};

    res.status(401).send(resBody);
    return;
  }
  if(userAccessToken !== accessOptions?.accessToken) {
    const errorId = await insertError(21401, 'Access token not valid.');
    resBody.error = {errorCode: 21, errorId: errorId? errorId: 0};

    res.status(401).send(resBody);
    return;
  }
};