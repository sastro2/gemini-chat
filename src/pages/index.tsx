import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next';
import React, { useEffect } from 'react';
import { useHistoryStore } from '../_state/Chat/historyWindow/historyStore';
import { useLoginStore } from '../_state/Session/loginStore';
import { History } from '../_types/History';
import { Message } from '../_types/Message';
import { ChatWindow } from '../components/Chat/ChatWindow';

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

  if(!accessOptions) {
    return {
      props: {
        auth: false,
        histories: [],
      },
    };
  };

  const {accessToken, username} = JSON.parse(accessOptions);

  const authRes = await fetch('http://localhost:3000/api/endpoints/auth/prefetch/authenticateUserPrefetch', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      accessToken,
      username
    }),
  });

  const parsedAuthRes = await authRes.json();

  if(!parsedAuthRes.auth) {
    return {
      props: {
        auth: false,
        histories: [],
      },
    };
  };

  const historyRes = await fetch('http://localhost:3000/api/endpoints/histories/prefetch/getAllHistoriesPrefetch', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      accessToken,
      username,
    }),
  });

  const parsedHistoryRes = await historyRes.json();
  const historyIds = parsedHistoryRes.history.map((history: History) => history.id);

  const messagesRes = await fetch('http://localhost:3000/api/endpoints/messages/prefetch/getMessagesByHistoryIdsPrefetch', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      accessToken,
      username,
      historyIds,
    }),
  });

  const parsedMessagesRes = await messagesRes.json();

  const histories: History[] = parsedHistoryRes.history;
  const messages: Message[] = parsedMessagesRes.messages;

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

  return {
    props: {
      auth: true,
      histories: newHistories,
    },
  };
};
