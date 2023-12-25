import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next';
import React, { useEffect } from 'react';
import { useLoginStore } from '../_state/Session/loginStore';
import { History } from '../_types/History';
import { ChatWindow } from '../components/Chat/ChatWindow';

interface IEntry {
  auth: boolean;
  histories: History[];
};

export default function Entry(props: IEntry) {
  const {changeLoggedIn} = useLoginStore();

  useEffect(() => {
    if(props.auth) changeLoggedIn(true);
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

  const authRes = await fetch('http://localhost:3000/api/endpoints/auth/authenticateUser', {
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

  const historyRes = await fetch('http://localhost:3000/api/endpoints/histories/getAllHistories', {
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
  const historyIndices = parsedHistoryRes.history.map((history: History) => history.id);



  return {
    props: {
      auth: true,
      histories: [],
    },
  };
};
