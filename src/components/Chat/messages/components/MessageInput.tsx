import LocalFireDepartmentOutlinedIcon from '@mui/icons-material/LocalFireDepartmentOutlined';
import { Button, Container, Slider, Tooltip } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useEffect, useRef } from 'react';
import { useHistoryStore } from '../../../../_state/Chat/historyWindow/historyStore';
import { useMessagesStore } from '../../../../_state/Chat/messageWindow/messagesStore';
import { useLoginStore } from '../../../../_state/Session/loginStore';
import { SendUserMessageData } from '../../../../methods/_Bundles/chat/SendUserMessageData';
import { SendUserMessageMethods } from '../../../../methods/_Bundles/chat/SendUserMessageMethods';
import { getTempButtonColor } from '../../../../methods/chat/messages/getTempButtonColor';
import { getTempButtonSize } from '../../../../methods/chat/messages/getTempButtonSize';
import { sendUserMessageToGemini } from '../../../../methods/chat/messages/sendUserMessageToGemini';
import { StyleSheet } from '../../../../styleSheet';

interface IMessageInput {};

export const MessageInput: React.FC<IMessageInput> = () => {
  const {messageInput, currentMessageHistory, aiResponseLoading, typingOutResponse, showTempInput, changeShowTempInput, changeCurrentMessageHistory, changeMessageInput, changeAiReponseLoading} = useMessagesStore();
  const {addHistory, addMessageToHistory} = useHistoryStore();
  const {loggedIn} = useLoginStore();

  const sliderContainerRef = useRef<HTMLDivElement>(null);

  //handle click outside of slider
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sliderContainerRef.current && !sliderContainerRef.current.contains(event.target as Node)) {
        changeShowTempInput(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  //Data and Methods for sendUserMessageToGemini
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
    addMessageToHistory
  };

  return (
    <Container style={{ width: '100%', display: 'flex', padding: 0, margin: 0, gap: '0.5%'}} maxWidth={false}>
      <TextField onKeyDown={(e) => {sendUserMessageToGemini(sendUserMessageData, SendUserMessageMethods, e.code)}} onChange={(e) => {changeMessageInput(e.currentTarget.value)}} value={messageInput} style={{ width: '100%', backgroundColor: StyleSheet.background.messages.messageWindowContainer }} sx={{ input: {color: StyleSheet.characters, borderColor: StyleSheet.borders} }} autoFocus placeholder='Message Gemini' />
      <Container ref={sliderContainerRef} style={{position: 'relative', height: '100%', width: 'auto', padding: 0, margin: 0, alignItems: 'center', justifyContent: 'center'}} maxWidth={false}>
        {showTempInput
          ?<Slider orientation='vertical' color={getTempButtonColor(currentMessageHistory.temperature)} value={currentMessageHistory.temperature} onChange={(e, newValue) => [changeCurrentMessageHistory({...currentMessageHistory, temperature: newValue as number}), console.log(newValue)]} defaultValue={0.2} min={0} max={1} step={0.1} style={{position: 'absolute', bottom: 66, left: 15, height: '200%'}} valueLabelDisplay='auto'/>
          : null}
        <Tooltip title={<div>Adjust the temperature to increase randomness in Geminis responses making it more or less creative. Learn more about <a target='blanc' href={'https://ai.google.dev/docs/concepts#model_parameters'}>temperature</a></div>} placement='left' arrow>
          <Button variant='contained' color={getTempButtonColor(currentMessageHistory.temperature)} style={{height: '100%', padding: 0}} onClick={() => changeShowTempInput(!showTempInput)}>
            <LocalFireDepartmentOutlinedIcon fontSize={getTempButtonSize(currentMessageHistory.temperature)} />
          </Button>
        </Tooltip>
      </Container>
      <Button onClick={() => sendUserMessageToGemini(sendUserMessageData, SendUserMessageMethods, 'Enter')} style={{justifyContent: 'center', alignItems: 'center', lineHeight: 0, backgroundColor: StyleSheet.buttons}} variant='contained'>Send</Button>
    </Container>
  );
};
