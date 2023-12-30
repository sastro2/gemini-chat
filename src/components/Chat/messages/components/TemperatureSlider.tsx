import LocalFireDepartmentOutlinedIcon from '@mui/icons-material/LocalFireDepartmentOutlined';
import { Button, Container, Tooltip } from '@mui/material';
import { useEffect, useRef } from 'react';
import { useMessagesStore } from '../../../../_state/Chat/messageWindow/messagesStore';
import { getTempButtonColor } from '../../../../methods/chat/messages/getTempButtonColor';
import { getTempButtonSize } from '../../../../methods/chat/messages/getTempButtonSize';
import styles from '../_styles/messageStyles.module.css';
import { SliderComponent } from './SliderComponent';

interface ITemperatureSlider {}

export const TemperatureSlider: React.FC<ITemperatureSlider> = () => {
  const {currentMessageHistory, showTempInput, changeShowTempInput} = useMessagesStore();

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
        <SliderComponent showTempInput={showTempInput} />
        <Tooltip title={<div>Adjust the temperature to increase randomness in Geminis responses making it more or less creative. Learn more about <a target='blanc' href={'https://ai.google.dev/docs/concepts#model_parameters'}>temperature</a></div>} placement='left' arrow>
          <Button id={styles.temperatureButton} variant='contained' color={getTempButtonColor(currentMessageHistory.temperature)}  onClick={() => changeShowTempInput(!showTempInput)}>
            <LocalFireDepartmentOutlinedIcon fontSize={getTempButtonSize(currentMessageHistory.temperature)} />
          </Button>
        </Tooltip>
      </Container>
  )
};