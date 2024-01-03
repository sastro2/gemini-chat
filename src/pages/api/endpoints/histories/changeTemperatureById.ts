import { NextApiRequest, NextApiResponse } from 'next';
import { DefaultApiResponseBody } from '../../../../_types/DefaultApiResponseBody';
import { updateTemperatureById } from '../../../../methods/dataAccess/histories/UPDATE/updateTemperatureById';
import { confirmAccessClient } from '../../../../methods/server/confirmAccessClient';

type ChangeTempByIdReqBody = {
  id: number;
  historyTemperature: number;
};

type ChangeTempNextApiReq = Omit<NextApiRequest, 'body'> & {
  body: ChangeTempByIdReqBody;
};

type ChangeTempByIdNextApiResponseBody = DefaultApiResponseBody;

const changeTemperatureById = async(req: ChangeTempNextApiReq, res: NextApiResponse<ChangeTempByIdNextApiResponseBody>) => {
  const resBody: ChangeTempByIdNextApiResponseBody = {auth: false, error: {errorId: 0, errorCode: 0}};

  if(req.method !== 'PATCH') {res.status(405); return;}

  await confirmAccessClient(req.headers.cookie, res, resBody);

  resBody.auth = true;

  const { historyTemperature, id } = req.body;

  await updateTemperatureById(id, historyTemperature);

  res.status(200).send(resBody);
  return;
};

export default changeTemperatureById;