/* eslint-disable @typescript-eslint/no-misused-promises */
import { TextField } from '@mui/material';
import { useHistoryStore } from '../../../../_state/Chat/historyWindow/historyStore';
import { useMessagesStore } from '../../../../_state/Chat/messageWindow/messagesStore';
import { useErrorStore } from '../../../../_state/Error/errorStore';
import { useLoginStore } from '../../../../_state/Session/loginStore';
import { SendUserMessageData } from '../../../../methods/_Bundles/chat/SendUserMessageData';
import { SendUserMessageMethods } from '../../../../methods/_Bundles/chat/SendUserMessageMethods';
import { sendUserMessageToGemini } from '../../../../methods/chat/messages/sendUserMessageToGemini';
import styles from '../_styles/messageStyles.module.css';

interface IMessageInputTextField {}

export const MessageInputTextField: React.FC<IMessageInputTextField> = () => {
  const {messageInput, aiResponseLoading, currentMessageHistory, typingOutResponse, changeMessageInput, changeCurrentMessageHistory, changeAiReponseLoading} = useMessagesStore();
  const {addHistory, addMessageToHistory, clearHistories} = useHistoryStore();
  const {loggedIn, changeLoggedIn} = useLoginStore();
  const { changeError, changeErrorSnackbarOpen } = useErrorStore();

  // #region Data and Methods for sendUserMessageToGemini
  const sendUserMessageData: SendUserMessageData = {
    aiResponseLoading,
    messageInput,
    currentMessageHistory,
    typingOutResponse,
    loggedIn,
  };
  const SendUserMessageMethods: SendUserMessageMethods = {
    changeMessageInput,
    changeCurrentMessageHistory,
    changeAiReponseLoading,
    addHistory,
    addMessageToHistory,
    clearHistories,
    changeLoggedIn,
    changeError,
    changeErrorSnackbarOpen,
  };
  // #endregion

  return(
    <TextField className={styles.messageInputTextField} onKeyDown={(e) => sendUserMessageToGemini(sendUserMessageData, SendUserMessageMethods, e.code)} onChange={(e) => {changeMessageInput(e.currentTarget.value)}} value={messageInput} sx={{ input: {color: 'white'} }} autoFocus placeholder='Message Gemini' />
  )
};