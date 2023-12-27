import { NextApiRequest, NextApiResponse } from 'next';
import { Error } from '../../../../_types/Error';
import { updateTemperatureById } from '../../../../methods/dataAccess/histories/UPDATE/updateTemperatureById';
import { validateAccessOptions } from '../../../../methods/server/validateAccessOptions';

type ChangeTempByIdReqBody = {
  id: number;
  historyTemperature: number;
};

type ChangeTempNextApiReq = Omit<NextApiRequest, 'body'> & {
  body: ChangeTempByIdReqBody;
};

type ChangeTempByIdNextApiResponseBody = {
  error: Error;
};

const changeTemperatureById = async(req: ChangeTempNextApiReq, res: NextApiResponse<ChangeTempByIdNextApiResponseBody>) => {
  const resBody: ChangeTempByIdNextApiResponseBody = {error: {errorId: 0, errorCode: 0}};

  if(req.method !== 'PATCH') {res.status(405); return;};

  const accessOptions = await validateAccessOptions(req.headers.cookie, res, false);

  if(!accessOptions?.accessToken ||!accessOptions.username) {
    return;
  }

  const { historyTemperature, id } = req.body;

  await updateTemperatureById(id, historyTemperature);

  res.status(200).send(resBody);
  return;
};

export default changeTemperatureById;