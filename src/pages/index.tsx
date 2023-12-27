import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next';
import React, { useEffect } from 'react';
import { useHistoryStore } from '../_state/Chat/historyWindow/historyStore';
import { useLoginStore } from '../_state/Session/loginStore';
import { ApiMethods } from '../_types/ApiMethods';
import { History } from '../_types/History';
import { Message } from '../_types/Message';
import { ChatWindow } from '../components/Chat/ChatWindow';
import apiFetch from '../methods/general/apiFetch';

interface IEntry {
  auth: boolean;
  histories: History[];
};

export default function Entry(props: IEntry) {
  const {changeLoggedIn} = useLoginStore();
  const {changeHistories} = useHistoryStore();

  useEffect(() => {
    if(props.auth){
      changeLoggedIn(true);
      changeHistories(props.histories);
    }else{
      changeLoggedIn(false);
    };
  }, [])

  return <ChatWindow />;
}


export const getServerSideProps: GetServerSideProps<IEntry> = async(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<IEntry>> => {
  const accessOptions = context.req.cookies.accessOptions;

  // if there is no cookie - not authenticated
  if(!accessOptions) {
    return {
      props: {
        auth: false,
        histories: [],
      },
    };
  };

  //initial authentication with cookie
  const {accessToken, username} = JSON.parse(accessOptions);
  const authRes = await apiFetch(`/api/endpoints/auth/prefetch/authenticateUserPrefetch`, ApiMethods.POST, {username, accessToken})

  //if the cookie isnt valid - not authenticated
  if(!authRes) {
    return {
      props: {
        auth: false,
        histories: [],
      },
    };
  };

  // #region initial history/message fetch
  const historyRes = await apiFetch(`/api/endpoints/histories/prefetch/getAllHistoriesPrefetch`, ApiMethods.POST, {username, accessToken})
  const historyIds = historyRes.history.map((history: History) => history.id);

  const messagesRes = await apiFetch(`/api/endpoints/messages/prefetch/getMessagesByHistoryIdsPrefetch`, ApiMethods.POST, {username, accessToken, body: {historyIds}});
  // #endregion

  const histories: History[] = historyRes.history;
  const messages: Message[] = messagesRes.messages;

  // if theres either no histories or no messages - return with initial histories = []
  if(!histories || !messages) return {
    props: {
      auth: true,
      histories: [],
    },
  };

  const newHistories: History[] = [];
  histories.forEach((history: History) => {
    history.messages = messages.filter((message: Message) => message.historyId === history.id);
    newHistories.push(history);
  });

  // return with initial histories
  return {
    props: {
      auth: true,
      histories: newHistories,
    },
  };
};
