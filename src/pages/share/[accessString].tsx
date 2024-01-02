import Container from '@mui/material/Container';
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next';
import SimpleBar from 'simplebar-react';
import { useMediaQueryStore } from '../../_state/Page/mediaQueryStore';
import { ApiMethods } from '../../_types/ApiMethods';
import { Message } from '../../_types/Message';
import { SavedWindow } from '../../components/Saved/SavedWindow';
import styles from '../../components/Saved/styles/savedStyles.module.css';
import apiFetch from '../../methods/general/apiFetch';
import { messageGuard } from '../../methods/Typeguards/messageGuard';

interface ISaved {
  messages: (Omit<Message, 'created'> & {created: string})[];
}

export default function Saved(props: ISaved) {
  const { frameSize } = useMediaQueryStore();

  let messages: Message[] = props.messages.map((message: Omit<Message, 'created'> & {created: string}) => {
    return {...message, created: new Date(message.created)}
  })

  if(messages.length === 0) messages = [{created: new Date(), parts: 'This chat does not exist or was deleted', role: 'model', initialPrint: false, historyId: 0}]

  return (
    <SimpleBar style={{display: 'flex', height: '100%'}}>
      <Container id={frameSize !== 'desktop'? styles.messagesContainerMobile: styles.messagesContainer} maxWidth={false}>
        <h2 style={{color: 'lightGray'}}>
        {messages[0].created.toLocaleDateString()}
        </h2>
        <SavedWindow messages={messages} />
      </Container>
    </SimpleBar>
  )
}

export const getServerSideProps: GetServerSideProps<ISaved> = async(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<ISaved>> => {
  const accessString = context.params?.accessString;

  const result = await apiFetch('/api/endpoints/savedHistories/prefetch/getSavedHistory', ApiMethods.POST, {body: {accessString}, username: 'sascha', accessToken: 'VIaf3BfsIjtUwUOEnjc2fjuBzDRtYwZw'});

  if(!result.messages) {
    return {
      props: {
        messages: [],
      }
    }
  }
  if(!Array.isArray(result.messages)) {
    return {
      props: {
        messages: [],
      }
    }
  }
  if(result.messages.length === 0) {
    return {
      props: {
        messages: [],
      }
    }
  }

  const confirmedMessages: (Omit<Message, 'created'> & {created: string})[] = [];

  result.messages.map((message: Omit<Message, 'created'> & {created: string}) => {
    if(messageGuard(message)) {
      const newCreated = message.created.toString()

      confirmedMessages.push({...message, created: newCreated});
    }
  });

  return {
    props: {
      messages: confirmedMessages,
    }
  }
}