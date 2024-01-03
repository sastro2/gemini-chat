import crypto from 'crypto';
import { NextApiRequest, NextApiResponse } from 'next';
import { DefaultApiResponseBody } from '../../../../_types/DefaultApiResponseBody';
import { insertError } from '../../../../methods/dataAccess/errors/INSERT/insertError';
import { insertSavedHistory } from '../../../../methods/dataAccess/savedHistories/INSERT/insertSavedHistory';
import { selectSavedHistoryByHistoryId } from '../../../../methods/dataAccess/savedHistories/SELECT/selectSavedHistoryByHistoryId';
import { confirmAccessClient } from '../../../../methods/server/confirmAccessClient';

type AddSavedHistoryReqBody = {
  historyId: number;
};

type AddSavedHistoryNextApiReq = Omit<NextApiRequest, 'body'> & {
  body: AddSavedHistoryReqBody;
};

export type AddSavedHistoryResponseBody = DefaultApiResponseBody & {
  saved?: boolean;
  accessString?: string | null;
};

export const generateRandomString = (length: number) => {
  const randomBytes = crypto.randomBytes(Math.ceil(length / 2));
  return randomBytes.toString('hex').slice(0, length);
}

const addSavedHistory = async(req: AddSavedHistoryNextApiReq, res: NextApiResponse<AddSavedHistoryResponseBody>) => {
  const resBody: AddSavedHistoryResponseBody = {auth: false, saved: false, accessString: null, error: {errorCode: 0, errorId: 0}};

  if(req.method !== 'POST') {res.status(405).send(resBody); return;}

  await confirmAccessClient(req.headers.cookie, res, resBody);

  const { historyId } = req.body;

  const accessString = await selectSavedHistoryByHistoryId(historyId);
  if(accessString) {
    resBody.accessString = accessString;
    resBody.saved = true;

    res.status(200).send(resBody);
    return;
  }

  const randomString = generateRandomString(32);
  const acsString = await insertSavedHistory(historyId, randomString);

  if(!acsString) {
    const errorId = await insertError(50500, 'Internal server error.');
    resBody.error = {errorCode: 50, errorId: errorId? errorId: 0};

    res.status(500).send(resBody);
    return;
  }

  resBody.accessString = acsString;
  res.status(200).send(resBody);
  return;
};

export default addSavedHistory;