import { defaultCurrentMessageHistory } from '../../_state/Chat/messageWindow/messagesStore';
import { ApiFetchFunctions } from '../../_types/ApiFetchFunctions';
import { ApiMethods } from '../../_types/ApiMethods';
import { History } from '../../_types/History';
import { Message } from '../../_types/Message';
import { LoginData } from '../_Bundles/login/LoginData';
import { LoginMethods } from '../_Bundles/login/LoginMethods';
import apiFetch, { ApiFetchBody } from '../general/apiFetch';
import { dbHistoryGuard } from '../Typeguards/dbHistoryGuard';
import { loginUserResponseBodyGuard } from '../Typeguards/loginUserResponseBodyGuard';
import { messageGuard } from '../Typeguards/messageGuard';

export const login = async(loginData: LoginData, loginMethods: LoginMethods): Promise<undefined>=> {
  const { usernameInput, passwordInput } = loginData;
  const { changeLoggedIn, clearHistories, changeCurrentMessageHistory, changeHistories, changeLoginDialogOpen, changeError, changeErrorSnackbarOpen } = loginMethods;

  if(!usernameInput || !passwordInput) return;

  const apiFetchFunctions: ApiFetchFunctions = {
    changeLoggedIn: changeLoggedIn,
    clearHistories: clearHistories,
    changeCurrentMessageHistory: changeCurrentMessageHistory,
    changeError: changeError,
    changeErrorSnackbarOpen: changeErrorSnackbarOpen
  };

  const loginRes: ApiFetchBody = await apiFetch(`/api/endpoints/auth/loginUser`, ApiMethods.POST, {functions: apiFetchFunctions, body: {usernameInput, passwordInput}});
  const authenticated = loginRes.auth;

  if(!loginUserResponseBodyGuard(loginRes) || !authenticated) return;

  // #region fetch histories and messages
  const historiesRes: ApiFetchBody = await apiFetch(`/api/endpoints/histories/getAllHistoriesByUserId`, ApiMethods.POST, {functions: apiFetchFunctions});
  const confirmedHistories: History[] = [];


  if(Array.isArray(historiesRes.histories)) {
    historiesRes.histories.forEach((history: History) => {
      if(dbHistoryGuard(history)){
        confirmedHistories.push(history);
      }
    });
  }

  const historyIds = confirmedHistories.map((history: History) => history.id);

  const messagesRes: ApiFetchBody = await apiFetch(`/api/endpoints/messages/getMessagesByHistoryIds`, ApiMethods.POST, {functions: apiFetchFunctions, body: {historyIds}});
  const confirmedMessages: Message[] = [];
  console.log(messagesRes, confirmedMessages);
  if(Array.isArray(messagesRes.messages)) {
    messagesRes.messages.forEach((message: Message) => {
      if(messageGuard(message)){
        confirmedMessages.push(message);
      }
    });
  }
  // #endregion

  const histories: History[] = confirmedHistories;
  const messages: Message[] = confirmedMessages;

  const newHistories: History[] = [];
  histories.forEach((history: History) => {
    if(!messages.find((message: Message) => message.historyId === history.id)) return;

    history.messages = messages.filter((message: Message) => message.historyId === history.id);
    newHistories.push(history);
  });
  const sortedHistories = newHistories.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());

  // #region change states
  changeHistories(sortedHistories);
  changeCurrentMessageHistory(defaultCurrentMessageHistory);
  changeLoggedIn(loginRes.auth);
  changeLoginDialogOpen(false);
  // #endregion
  return;
};