import { NextApiRequest, NextApiResponse } from 'next';
import { DefaultApiResponseBody } from '../../../../../_types/DefaultApiResponseBody';
import { Message } from '../../../../../_types/Message';
import { insertError } from '../../../../../methods/dataAccess/errors/INSERT/insertError';
import { selectMessagesByHistoryIds } from '../../../../../methods/dataAccess/messages/SELECT/selectMessagesByHistoryIds';
import { selectSavedHistoryByAccessString } from '../../../../../methods/dataAccess/savedHistories/SELECT/selectSavedHistoryByAccessString';
import { selectAccessTokenByUsername } from '../../../../../methods/dataAccess/users/SELECT/selectAccessTokenByUsername';
import { selectUserIdByUsername } from '../../../../../methods/dataAccess/users/SELECT/selectUserIdByUsername';
import { checkUserAccessToken } from '../../../../../methods/server/checkUserAccessToken';
import { validateAccessOptions } from '../../../../../methods/server/validateAccessOptions';

type GetSavedHistoryReqBody = {
  accessString: string;
  username: string;
  accessToken: string;
};

type GetSavedHistoryNextApiReq = Omit<NextApiRequest, 'body'> & {
  body: GetSavedHistoryReqBody;
};

export type GetSavedHistoryResponseBody = DefaultApiResponseBody & {
  messages?: Message[];
};

const getSavedHistory = async(req: GetSavedHistoryNextApiReq, res: NextApiResponse<GetSavedHistoryResponseBody>) => {
  const resBody: GetSavedHistoryResponseBody = {auth: false, messages: [], error: {errorCode: 0, errorId: 0}};

  if(req.method !== 'POST') {res.status(405).send(resBody); return;}

  const accessOptions = await validateAccessOptions(req.body.accessToken, res, true, req.body.username);

  if(!accessOptions?.accessToken ||!accessOptions.username) {
    return;
  }

  const userAccessToken = await selectAccessTokenByUsername(accessOptions.username);
  await checkUserAccessToken(userAccessToken, res, accessOptions);

  const { accessString } = req.body;

  const userId = await selectUserIdByUsername(accessOptions.username);

  if(!userId) {
    const errorId = await insertError(30401, 'User not found.');
    resBody.error = {errorCode: 30, errorId: errorId? errorId: 0};

    res.status(401).send(resBody);
    return;
  }

  resBody.auth = true;

  const result = await selectSavedHistoryByAccessString(accessString);
  if(!result || !result.historyId || !result.msgCount) {
    res.status(200).send(resBody);
    return;
  }

  const messages = await selectMessagesByHistoryIds([result.historyId]);
  if(!messages) {
    res.status(200).send(resBody);
    return;
  }

  resBody.messages = messages.slice(0, result.msgCount - 1);
  res.status(200).send(resBody);
  return;
};

export default getSavedHistory;