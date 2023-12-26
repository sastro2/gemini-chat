import { NextApiRequest, NextApiResponse } from 'next';
import { History } from '../../../../_types/History';
import { selectAllHistoriesByUserId } from '../../../../methods/dataAccess/histories/SELECT/selectAllHistoriesByUserId';
import { selectUserIdByUsername } from '../../../../methods/dataAccess/users/SELECT/selectUserIdByUsername';
import { validateAccessOptions } from '../../../../methods/server/validateAccessOptions';

type GetAllHistoriesReqBody = {
};

type GetAllHistoriesNextApiReq = Omit<NextApiRequest, 'body'> & {
  body: GetAllHistoriesReqBody;
};

type GetAllHistoriesResponseBody = {
  history: History[] | null;
};

const getAllHistoriesByUserId = async(req: GetAllHistoriesNextApiReq, res: NextApiResponse<GetAllHistoriesResponseBody>) => {
  const resBody: GetAllHistoriesResponseBody = {history: null};

  if(req.method !== 'POST') {res.status(405).send(resBody); return;};

  const accessOptions = await validateAccessOptions(req.headers.cookie, res, false);

  if(!accessOptions?.accessToken ||!accessOptions.username) {res.status(401).send(resBody); return;}

  const userId = await selectUserIdByUsername(accessOptions.username);

  if(!userId) {res.status(401).send(resBody); return;}

  const histories = await selectAllHistoriesByUserId(userId);

  if(!histories) {res.status(500).send(resBody); return;}

  resBody.history = histories;
  res.status(200).send(resBody);
  return;
};

export default getAllHistoriesByUserId;