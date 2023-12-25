import { NextApiRequest, NextApiResponse } from 'next';
import { validateAccessOptions } from '../../../../methods/server/validateAccessOptions';
import { updateTemperatureById } from '../../dataAccess/histories/UPDATE/updateTemperatureById';
import { selectUserIdByUsername } from '../../dataAccess/users/SELECT/selectUserIdByUsername';

type AddHistoryReqBody = {
  historyTemperature: number;
};

type AddHistoryNextApiReq = Omit<NextApiRequest, 'body'> & {
  body: AddHistoryReqBody;
};

const changeTemperatureById = async(req: AddHistoryNextApiReq, res: NextApiResponse) => {
  if(req.method !== 'PATCH') {res.status(405).send(null); return;};

  const accessOptions = await validateAccessOptions(req.headers.cookie, res, false);

  if(!accessOptions) {res.status(401).send(null); return;}

  const { historyTemperature } = req.body;

  const userId = await selectUserIdByUsername(accessOptions.username);

  if(!userId) {res.status(401).send(null); return;}

  await updateTemperatureById(userId, historyTemperature);

  res.status(200).send(null);
  return;
};

export default changeTemperatureById;