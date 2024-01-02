import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Container, Slider, SliderOwnProps, Tooltip } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useHistoryStore } from '../../../_state/Chat/historyWindow/historyStore';
import { useMessagesStore } from '../../../_state/Chat/messageWindow/messagesStore';
import { useMediaQueryStore } from '../../../_state/Page/mediaQueryStore';
import { getTempButtonColor } from '../../../methods/chat/messages/getTempButtonColor';
import styles from './_styles/messageStyles.module.css';
import { MessageInputTextField } from './components/MessageInputTextField';
import { SendButton } from './components/SendButton';
import { TemperatureSlider } from './components/TemperatureSlider';

interface IMessageInput {}

export const MessageInput: React.FC<IMessageInput> = () => {
  const [tooltipOpen, setTooltipOpen] = useState<boolean>(false);
  const { frameSize } = useMediaQueryStore();

  const infoIconRef = useRef<SVGSVGElement>(null);
  //handle click outside of info icon
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (infoIconRef.current && !infoIconRef.current.contains(event.target as Node)) {
        setTooltipOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [setTooltipOpen]);

  if(frameSize === 'mobile'){
    return(
      <Container id={styles.messageInputMobile} maxWidth={false}>
        <Container id={styles.temperatureInputMobile} disableGutters>
          <Tooltip open={tooltipOpen} onClose={() => setTooltipOpen(false)} onOpen={() => setTooltipOpen(true)} title={<div>Adjust the temperature to increase randomness in Geminis responses making it more or less creative. Learn more about <a target='blanc' href={'https://ai.google.dev/docs/concepts#model_parameters'}>temperature</a></div>}>
            <InfoOutlinedIcon id={styles.temperatureInputMobileIcon} ref={infoIconRef} onClick={() => setTooltipOpen(!tooltipOpen)} color='info' fontSize='small' />
          </Tooltip>
          <TemperatureSliderMobile />
        </Container>
        <MessageInputTextField />
      </Container>
    )
  }

  return (
    <Container id={styles.messageInput} maxWidth={false}>
      <MessageInputTextField />
      <TemperatureSlider />
      <SendButton />
    </Container>
  );
}

interface ITemperatureSliderMobile {}

const sliderProps: SliderOwnProps = {
  min: 0,
  max: 1,
  step: 0.1,
  valueLabelDisplay: 'auto'
}

export const TemperatureSliderMobile: React.FC<ITemperatureSliderMobile> = () => {
  const {changeHistoryTemp} = useHistoryStore();
  const {currentMessageHistory, changeCurrentMessageHistory} = useMessagesStore();

  return(
    <Container id={styles.temperatureSliderMobileContainer}>
      <Slider id={styles.temperatureSliderMobile} {...sliderProps} value={currentMessageHistory.temperature? currentMessageHistory.temperature: 0.2} onChange={(_, newValue) => [changeCurrentMessageHistory({...currentMessageHistory, temperature: newValue as number}), changeHistoryTemp(currentMessageHistory.id, newValue as number)]} defaultValue={currentMessageHistory.temperature} color={getTempButtonColor(currentMessageHistory.temperature)} />
    </Container>
  )
}
