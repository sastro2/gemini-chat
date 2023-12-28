import { NextApiRequest, NextApiResponse } from 'next';
import { DefaultApiResponseBody } from '../../../../_types/DefaultApiResponseBody';
import { DbHistory } from '../../../../methods/dataAccess/_models/dbHistory';
import { insertError } from '../../../../methods/dataAccess/errors/INSERT/insertError';
import { selectAllHistoriesByUserId } from '../../../../methods/dataAccess/histories/SELECT/selectAllHistoriesByUserId';
import { selectUserIdByUsername } from '../../../../methods/dataAccess/users/SELECT/selectUserIdByUsername';
import { validateAccessOptions } from '../../../../methods/server/validateAccessOptions';

export type GetAllHistoriesResponseBody = DefaultApiResponseBody & {
  histories?: DbHistory[];
};

const getAllHistoriesByUserId = async(req: NextApiRequest, res: NextApiResponse<GetAllHistoriesResponseBody>) => {
  const resBody: GetAllHistoriesResponseBody = {auth: false, error: {errorCode: 0, errorId: 0}, histories: []};

  if(req.method !== 'POST') {res.status(405).send(resBody); return;}

  const accessOptions = await validateAccessOptions(req.headers.cookie, res, false);

  if(!accessOptions?.accessToken ||!accessOptions.username) {
    return;
  }

  const userId = await selectUserIdByUsername(accessOptions.username);

  if(!userId) {
    const errorId = await insertError(30401, 'User not found.');
    resBody.error = {errorCode: 30, errorId: errorId? errorId: 0};

    res.status(401).send(resBody);
    return;
  }

  resBody.auth = true;

  const histories = await selectAllHistoriesByUserId(userId);

  resBody.histories = histories;
  res.status(200).send(resBody);
  return;
};

export default getAllHistoriesByUserId;