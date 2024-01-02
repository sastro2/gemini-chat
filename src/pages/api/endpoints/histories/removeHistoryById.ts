import { NextApiRequest, NextApiResponse } from 'next';
import { DefaultApiResponseBody } from '../../../../_types/DefaultApiResponseBody';
import { insertError } from '../../../../methods/dataAccess/errors/INSERT/insertError';
import { deleteHistory } from '../../../../methods/dataAccess/histories/DELETE/deleteHistory';
import { deleteMessages } from '../../../../methods/dataAccess/messages/DELETE/deleteMessages';
import { selectAccessTokenByUsername } from '../../../../methods/dataAccess/users/SELECT/selectAccessTokenByUsername';
import { selectUserIdByUsername } from '../../../../methods/dataAccess/users/SELECT/selectUserIdByUsername';
import { checkUserAccessToken } from '../../../../methods/server/checkUserAccessToken';
import { validateAccessOptions } from '../../../../methods/server/validateAccessOptions';

type DeleteHistoryReqBody = {
  historyId: number;
};

type DeleteHistoryNextApiReq = Omit<NextApiRequest, 'body'> & {
  body: DeleteHistoryReqBody;
};

export type DeleteHistoryResponseBody = DefaultApiResponseBody

const removeHistory = async(req: DeleteHistoryNextApiReq, res: NextApiResponse<DeleteHistoryResponseBody>) => {
  const resBody: DeleteHistoryResponseBody = {auth: false, error: {errorCode: 0, errorId: 0}};

  if(req.method !== 'DELETE') {res.status(405).send(resBody); return;}

  const accessOptions = await validateAccessOptions(req.headers.cookie, res, false);

  if(!accessOptions?.accessToken ||!accessOptions.username) {
    return;
  }

  const userAccessToken = await selectAccessTokenByUsername(accessOptions.username);
  await checkUserAccessToken(userAccessToken, res, accessOptions);

  const { historyId } = req.body;

  const userId = await selectUserIdByUsername(accessOptions.username);

  if(!userId) {
    const errorId = await insertError(30401, 'User not found.');
    resBody.error = {errorCode: 30, errorId: errorId? errorId: 0};

    res.status(401).send(resBody);
    return;
  }

  resBody.auth = true;

  const id = await deleteHistory(historyId, userId);
  if(id !== -1) await deleteMessages(id);

  res.status(200).send(resBody);
  return;
};

export default removeHistory;