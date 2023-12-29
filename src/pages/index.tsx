import '@mui/material/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
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
import { accessOptionsGuard } from '../methods/Typeguards/accessOptionsGuard';
import { dbHistoryGuard } from '../methods/Typeguards/dbHistoryGuard';
import { messageGuard } from '../methods/Typeguards/messageGuard';

interface IEntry {
  auth: boolean;
  histories: History[];
}

const theme = createTheme({
  overrides: {
    MuiTextField: {
      root: {
        width: '100%', // Set the width to 100%
      },
    },
  },
});

export default function Entry(props: IEntry) {
  const {changeLoggedIn} = useLoginStore();
  const {changeHistories} = useHistoryStore();

  useEffect(() => {
    if(props.auth){
      changeLoggedIn(true);
      changeHistories(props.histories);
    }else{
      changeLoggedIn(false);
    }
  }, [changeLoggedIn, changeHistories, props.auth, props.histories]);

  return (
    <ThemeProvider theme={theme}>
      <ChatWindow />
    </ThemeProvider>
  );
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
  }

  //initial authentication with cookie
  const parsedAccessOptions: unknown = JSON.parse(accessOptions);

  if(!accessOptionsGuard(parsedAccessOptions)) {
    return {
      props: {
        auth: false,
        histories: [],
      },
    };
  }

  const {username, accessToken} = parsedAccessOptions;

  const authRes = await apiFetch(`/api/endpoints/auth/prefetch/authenticateUserPrefetch`, ApiMethods.POST, {username, accessToken})

  //if the cookie isnt valid - not authenticated
  if(!authRes.auth) {
    return {
      props: {
        auth: false,
        histories: [],
      },
    };
  }

  // #region initial history/message fetch
  const historyRes = await apiFetch(`/api/endpoints/histories/prefetch/getAllHistoriesPrefetch`, ApiMethods.POST, {username, accessToken})
  const confirmedHistories: History[] = [];

  if(Array.isArray(historyRes.history)){
    historyRes.history.forEach((history: History) => {
      if(dbHistoryGuard(history)) confirmedHistories.push(history);
    });
  }

  const historyIds = confirmedHistories.map((history: History) => history.id);

  const messagesRes = await apiFetch(`/api/endpoints/messages/prefetch/getMessagesByHistoryIdsPrefetch`, ApiMethods.POST, {username, accessToken, body: {historyIds}});
  const confirmedMessages: Message[] = [];

  if(Array.isArray(messagesRes.messages)){
    messagesRes.messages.forEach((message: Message) => {
      if(messageGuard(message)) confirmedMessages.push(message);
    });
  }
  // #endregion

  const histories: History[] = confirmedHistories;
  const messages: Message[] = confirmedMessages;

  // if theres either no histories or no messages - return with initial histories = []
  if(!histories || !messages){
    return {
      props: {
        auth: true,
        histories: [],
      },
    };
  }

  const newHistories: History[] = [];
  histories.forEach((history: History) => {
    // if there are no messages for this history - skip it
    if(!messages.find((message: Message) => message.historyId === history.id)) return;

    history.messages = messages.filter((message: Message) => message.historyId === history.id);
    newHistories.push(history);
  });
  const sortedHistories = newHistories.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());

  // return with initial histories
  return {
    props: {
      auth: true,
      histories: sortedHistories,
    },
  };
};
