import LocalFireDepartmentOutlinedIcon from '@mui/icons-material/LocalFireDepartmentOutlined';
import { Button, Container, Slider, Tooltip } from '@mui/material';
import { useEffect, useRef } from 'react';
import { useHistoryStore } from '../../../../_state/Chat/historyWindow/historyStore';
import { useMessagesStore } from '../../../../_state/Chat/messageWindow/messagesStore';
import { getTempButtonColor } from '../../../../methods/chat/messages/getTempButtonColor';
import { getTempButtonSize } from '../../../../methods/chat/messages/getTempButtonSize';
import styles from '../_styles/messageStyles.module.css';

interface ITemperatureSlider {}

export const TemperatureSlider: React.FC<ITemperatureSlider> = () => {
  const {currentMessageHistory, changeCurrentMessageHistory, showTempInput, changeShowTempInput} = useMessagesStore();
  const {changeHistoryTemp} = useHistoryStore();

  const sliderContainerRef = useRef<HTMLDivElement>(null);
  //handle click outside of slider
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sliderContainerRef.current && !sliderContainerRef.current.contains(event.target as Node) && showTempInput) {
        changeShowTempInput(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showTempInput, changeShowTempInput]);

  return(
    <Container id={styles.temperatureSliderContainer} ref={sliderContainerRef} maxWidth={false}>
        {showTempInput
          ?<Slider id={styles.temperatureSlider} orientation='vertical' color={getTempButtonColor(currentMessageHistory.temperature)} value={currentMessageHistory.temperature} onChange={(e, newValue) => [changeCurrentMessageHistory({...currentMessageHistory, temperature: newValue as number}), changeHistoryTemp(currentMessageHistory.id, newValue as number)]} defaultValue={currentMessageHistory.temperature} min={0} max={1} step={0.1}  valueLabelDisplay='auto'/>
          : null}
        <Tooltip title={<div>Adjust the temperature to increase randomness in Geminis responses making it more or less creative. Learn more about <a target='blanc' href={'https://ai.google.dev/docs/concepts#model_parameters'}>temperature</a></div>} placement='left' arrow>
          <Button id={styles.temperatureButton} variant='contained' color={getTempButtonColor(currentMessageHistory.temperature)}  onClick={() => changeShowTempInput(!showTempInput)}>
            <LocalFireDepartmentOutlinedIcon fontSize={getTempButtonSize(currentMessageHistory.temperature)} />
          </Button>
        </Tooltip>
      </Container>
  )
};