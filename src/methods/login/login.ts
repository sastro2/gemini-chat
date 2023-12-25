import { defaultCurrentMessageHistory } from '../../_state/Chat/messageWindow/messagesStore';
import { History } from '../../_types/History';
import { Message } from '../../_types/Message';
import { LoginData } from '../_Bundles/login/LoginData';
import { LoginMethods } from '../_Bundles/login/LoginMethods';

export const login = async(loginData: LoginData, loginMethods: LoginMethods): Promise<undefined>=> {
  if(!loginData.usernameInput || !loginData.passwordInput) return;

  const res = await fetch('http://localhost:3000/api/endpoints/auth/loginUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      usernameInput: loginData.usernameInput,
      passwordInput: loginData.passwordInput
    })
  });

  const parsedRes = await res.json();

  if(!parsedRes.auth) return;

  const historyRes = await fetch('http://localhost:3000/api/endpoints/histories/getAllHistoriesByUserId', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
    }),
  });

  const parsedHistoryRes = await historyRes.json();
  const historyIds = parsedHistoryRes.history.map((history: History) => history.id);

  const messagesRes = await fetch('http://localhost:3000/api/endpoints/messages/getMessagesByHistoryIds', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      historyIds,
    }),
  });

  const parsedMessagesRes = await messagesRes.json();

  const histories: History[] = parsedHistoryRes.history;
  const messages: Message[] = parsedMessagesRes.messages;

  const newHistories: History[] = [];
  histories.forEach((history: History) => {
    history.messages = messages.filter((message: Message) => message.historyId === history.id);
    newHistories.push(history);
  });

  loginMethods.changeHistories(newHistories);
  loginMethods.changeCurrentMessageHistory(defaultCurrentMessageHistory);
  loginMethods.changeLoggedIn(parsedRes.auth);
  loginMethods.changeLoginDialogOpen(false);
  return;
};