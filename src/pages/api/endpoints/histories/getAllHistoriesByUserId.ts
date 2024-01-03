import { NextApiRequest, NextApiResponse } from 'next';
import { DefaultApiResponseBody } from '../../../../_types/DefaultApiResponseBody';
import { DbHistory } from '../../../../methods/dataAccess/_models/dbHistory';
import { selectAllHistoriesByUserId } from '../../../../methods/dataAccess/histories/SELECT/selectAllHistoriesByUserId';
import { confirmAccessClient } from '../../../../methods/server/confirmAccessClient';

export type GetAllHistoriesResponseBody = DefaultApiResponseBody & {
  histories?: DbHistory[];
};

const getAllHistoriesByUserId = async(req: NextApiRequest, res: NextApiResponse<GetAllHistoriesResponseBody>) => {
  const resBody: GetAllHistoriesResponseBody = {auth: false, error: {errorCode: 0, errorId: 0}, histories: []};

  if(req.method !== 'POST') {res.status(405).send(resBody); return;}

  const userId = await confirmAccessClient(req.headers.cookie, res, resBody);

  const histories = await selectAllHistoriesByUserId(userId);

  resBody.histories = histories;
  res.status(200).send(resBody);
  return;
};

export default getAllHistoriesByUserId;