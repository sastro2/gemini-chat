import LocalFireDepartmentOutlinedIcon from '@mui/icons-material/LocalFireDepartmentOutlined';
import { Button, Container, Slider, Tooltip } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useEffect, useRef } from 'react';
import { useHistoryStore } from '../../../../_state/Chat/historyWindow/historyStore';
import { useMessagesStore } from '../../../../_state/Chat/messageWindow/messagesStore';
import { Message } from '../../../../_types/Message';
import { sendUserMessageToGemini } from '../../../../methods/chat/sendUserMessageToGemini';
import { StyleSheet } from '../../../../styleSheet';

interface IMessageInput {};

export const createHistory = (changeHistory: (history: Message[][]) => void, changeCurrentMessageHistory: (history: Message[]) => void) => {

};

const getTempButtonSize = (temperatureInput: number) => {
  if (temperatureInput >= 0 && temperatureInput <= 0.3) {
    return 'small';
  } else if (temperatureInput >= 0.4 && temperatureInput <= 0.7) {
    return 'medium';
  } else if (temperatureInput >= 0.8 && temperatureInput <= 1) {
    return 'large';
  } else {
    return 'small';
  };
};

const getTempButtonColor = (temperatureInput: number) => {
  if (temperatureInput >= 0 && temperatureInput <= 0.3) {
    return 'success';
  } else if (temperatureInput >= 0.4 && temperatureInput <= 0.7) {
    return 'warning';
  } else if (temperatureInput >= 0.8 && temperatureInput <= 1) {
    return 'error';
  } else {
    return 'success';
  };
}

export const MessageInput: React.FC<IMessageInput> = () => {
  const {messageInput, currentMessageHistory, aiResponseLoading, typingOutResponse, temperatureInput, showTempInput, changeShowTempInput, changeCurrentMessageHistory, changeMessageInput, changeAiReponseLoading, changeTemperatureInput} = useMessagesStore();
  const {history, changeHistory} = useHistoryStore();

  const sliderContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Function to handle clicks outside the component
    const handleClickOutside = (event: MouseEvent) => {
      if (sliderContainerRef.current && !sliderContainerRef.current.contains(event.target as Node)) {
        // Click is outside the component, so update state
        changeShowTempInput(false);
      }
    };

    // Add event listener when the component mounts
    document.addEventListener('click', handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <Container style={{ width: '100%', display: 'flex', padding: 0, margin: 0, gap: '0.5%'}} maxWidth={false}>
      <TextField onKeyDown={(e) => {sendUserMessageToGemini(aiResponseLoading, messageInput, currentMessageHistory, temperatureInput, changeMessageInput, changeCurrentMessageHistory, e.code, changeAiReponseLoading, changeHistory, history, typingOutResponse)}} onChange={(e) => {changeMessageInput(e.currentTarget.value)}} value={messageInput} style={{ width: '100%', backgroundColor: StyleSheet.background.messages.messageWindowContainer }} sx={{ input: {color: StyleSheet.characters, borderColor: StyleSheet.borders} }} autoFocus placeholder='Message Gemini' />
      <Container ref={sliderContainerRef} style={{position: 'relative', height: '100%', width: 'auto', padding: 0, margin: 0, alignItems: 'center', justifyContent: 'center'}} maxWidth={false}>
        {showTempInput
          ?<Slider orientation='vertical' color={getTempButtonColor(temperatureInput)} value={temperatureInput} onChange={(e, newValue) => changeTemperatureInput(newValue as number)} defaultValue={0.2} min={0} max={1} step={0.1} style={{position: 'absolute', bottom: 66, left: 15, height: '200%'}} valueLabelDisplay='auto'/>
          : null}
        <Tooltip title={<div>Adjust the temperature to increase randomness in Geminis responses making it more or less creative. Learn more about <a target='blanc' href={'https://ai.google.dev/docs/concepts#model_parameters'}>temperature</a></div>} placement='left' arrow>
          <Button variant='contained' color={getTempButtonColor(temperatureInput)} style={{height: '100%', padding: 0}} onClick={() => changeShowTempInput(!showTempInput)}>
            <LocalFireDepartmentOutlinedIcon fontSize={getTempButtonSize(temperatureInput)} />
          </Button>
        </Tooltip>
      </Container>
      <Button onClick={() => sendUserMessageToGemini(aiResponseLoading, messageInput, currentMessageHistory, temperatureInput, changeMessageInput, changeCurrentMessageHistory, 'Enter', changeAiReponseLoading, changeHistory, history, typingOutResponse)} style={{justifyContent: 'center', alignItems: 'center', lineHeight: 0, backgroundColor: StyleSheet.buttons}} variant='contained'>Send</Button>
    </Container>
  );
};
