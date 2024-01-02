import { TextField, TextFieldProps } from '@mui/material';
import { useHistoryStore } from '../../../../_state/Chat/historyWindow/historyStore';
import { useMessagesStore } from '../../../../_state/Chat/messageWindow/messagesStore';
import { useErrorStore } from '../../../../_state/InputResponse/errorStore';
import { useLoginStore } from '../../../../_state/Session/loginStore';
import { SendUserMessageData } from '../../../../methods/_Bundles/chat/SendUserMessageData';
import { SendUserMessageMethods } from '../../../../methods/_Bundles/chat/SendUserMessageMethods';
import { sendUserMessageToGemini } from '../../../../methods/chat/messages/sendUserMessageToGemini';
import styles from '../_styles/messageStyles.module.css';

interface IMessageInputTextField {}

const textFieldProps: TextFieldProps = {
  sx: { color: 'white', width: '100%' },
  autoFocus: true,
  placeholder: 'Message Gemini',
}

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
    <TextField id={styles.messageInputTextField} {...textFieldProps} onKeyDown={(e) => sendUserMessageToGemini(sendUserMessageData, SendUserMessageMethods, e.code)} onChange={(e) => {changeMessageInput(e.currentTarget.value)}} value={messageInput} />
  )
};