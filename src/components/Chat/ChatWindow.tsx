import { Container, Grid } from '@mui/material';
import { Header } from '../general/Header';
import styles from './_styles/chatStyles.module.css';
import { ChatAbsolutes } from './ChatAbsolutes';
import { HistoryWindow } from './history/HistoryWindow';
import { MessageInput } from './messages/MessageInput';
import { MessagesWindow } from './messages/MessagesWindow';

interface IChatWindow {}

export const ChatWindow: React.FC<IChatWindow> = () => {
  return (
    <Grid id={styles.grid} columns={2} >
      <HistoryWindow />
      <Container id={styles.chatWindow} disableGutters maxWidth={false} >
        <Header />
        <MessagesWindow />
        <MessageInput />
        <ChatAbsolutes />
      </Container>
    </Grid>
  );
};