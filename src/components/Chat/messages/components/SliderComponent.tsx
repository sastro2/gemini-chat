import { Slider, SliderOwnProps } from '@mui/material';
import { useHistoryStore } from '../../../../_state/Chat/historyWindow/historyStore';
import { useMessagesStore } from '../../../../_state/Chat/messageWindow/messagesStore';
import { getTempButtonColor } from '../../../../methods/chat/messages/getTempButtonColor';
import styles from '../_styles/messageStyles.module.css';

interface ISliderComponent {
  showTempInput: boolean;
}

const sliderProps: SliderOwnProps = {
  orientation: 'vertical',
  min: 0,
  max: 1,
  step: 0.1,
  valueLabelDisplay: 'auto'
}

export const SliderComponent: React.FC<ISliderComponent> = (props) => {
  const {changeHistoryTemp} = useHistoryStore();
  const {currentMessageHistory, changeCurrentMessageHistory} = useMessagesStore();

  if(!props.showTempInput) return null;

  return(
    <Slider id={styles.temperatureSlider} {...sliderProps} value={currentMessageHistory.temperature} onChange={(_, newValue) => [changeCurrentMessageHistory({...currentMessageHistory, temperature: newValue as number}), changeHistoryTemp(currentMessageHistory.id, newValue as number)]} defaultValue={currentMessageHistory.temperature} color={getTempButtonColor(currentMessageHistory.temperature)} />
  )
}