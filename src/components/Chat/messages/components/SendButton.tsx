import { Button } from '@mui/material';
import { useHistoryStore } from '../../../../_state/Chat/historyWindow/historyStore';
import { useMessagesStore } from '../../../../_state/Chat/messageWindow/messagesStore';
import { useLoginStore } from '../../../../_state/Session/loginStore';
import { SendUserMessageData } from '../../../../methods/_Bundles/chat/SendUserMessageData';
import { SendUserMessageMethods } from '../../../../methods/_Bundles/chat/SendUserMessageMethods';
import { sendUserMessageToGemini } from '../../../../methods/chat/messages/sendUserMessageToGemini';
import { StyleSheet } from '../../../../styleSheet';

interface ISendButton {};

export const SendButton: React.FC<ISendButton> = () => {
  const {messageInput, aiResponseLoading, currentMessageHistory, typingOutResponse, changeMessageInput, changeCurrentMessageHistory, changeAiReponseLoading} = useMessagesStore();
  const {addHistory, addMessageToHistory, clearHistories} = useHistoryStore();
  const {loggedIn, changeLoggedIn} = useLoginStore();

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
    changeLoggedIn
  };
  // #endregion

  return(
    <Button onClick={() => sendUserMessageToGemini(sendUserMessageData, SendUserMessageMethods, 'Enter')} style={{justifyContent: 'center', alignItems: 'center', lineHeight: 0, backgroundColor: StyleSheet.buttons}} variant='contained'>Send</Button>
  )
};