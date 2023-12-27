import { defaultCurrentMessageHistory } from '../../_state/Chat/messageWindow/messagesStore';
import { ApiFetchFunctions } from '../../_types/ApiFetchFunctions';
import { ApiMethods } from '../../_types/ApiMethods';
import { History } from '../../_types/History';
import { Message } from '../../_types/Message';
import { LoginData } from '../_Bundles/login/LoginData';
import { LoginMethods } from '../_Bundles/login/LoginMethods';
import apiFetch from '../general/apiFetch';

export const login = async(loginData: LoginData, loginMethods: LoginMethods): Promise<undefined>=> {
  const { usernameInput, passwordInput } = loginData;
  const { changeLoggedIn, clearHistories, changeCurrentMessageHistory, changeHistories, changeLoginDialogOpen } = loginMethods;

  if(!usernameInput || !passwordInput) return;

  const apiFetchFunctions: ApiFetchFunctions = {
    changeLoggedIn: changeLoggedIn,
    clearHistories: clearHistories,
    changeCurrentMessageHistory: changeCurrentMessageHistory,
  };

  const loginRes = await apiFetch(`/api/endpoints/auth/loginUser`, ApiMethods.POST, {functions: apiFetchFunctions, body: {usernameInput, passwordInput}});

  const authenticated = loginRes.auth;
  if(!authenticated) return;

  // #region fetch histories and messages
  const historyRes = await apiFetch(`/api/endpoints/histories/getAllHistoriesByUserId`, ApiMethods.POST, {functions: apiFetchFunctions});
  const historyIds = historyRes.history.map((history: History) => history.id);

  const messagesRes = await apiFetch(`/api/endpoints/messages/getMessagesByHistoryIds`, ApiMethods.POST, {functions: apiFetchFunctions, body: {historyIds}});
  // #endregion

  const histories: History[] = historyRes.history;
  const messages: Message[] = messagesRes.messages;

  const newHistories: History[] = [];
  histories.forEach((history: History) => {
    history.messages = messages.filter((message: Message) => message.historyId === history.id);
    newHistories.push(history);
  });

  // #region change states
  changeHistories(newHistories);
  changeCurrentMessageHistory(defaultCurrentMessageHistory);
  changeLoggedIn(loginRes.auth);
  changeLoginDialogOpen(false);
  // #endregion
  return;
};