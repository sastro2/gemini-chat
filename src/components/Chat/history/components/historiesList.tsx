import { Container } from '@mui/material';
import { ReactNode } from 'react';
import SimpleBar from 'simplebar-react';
import { useHistoryStore } from '../../../../_state/Chat/historyWindow/historyStore';
import { getTimeBracket } from '../../../../methods/chat/histories/getTimeBracket';
import styles from '../_styles/historyStyles.module.css';
import { HistoryDateDivider } from './HistoryDateDivider';
import { HistorySingle } from './HistorySingle';

interface IHistoriesList {}

export const HistoriesList: React.FC<IHistoriesList> = () => {
  const {histories} = useHistoryStore();

  const componentArray: ReactNode[] = [];
  // #region history sorting
    histories.forEach((history, index) => {
      const timeBracket = getTimeBracket(new Date(history.created));

      if(!componentArray[componentArray.length - 1]){
        componentArray.push(<HistoryDateDivider key={timeBracket} timeBracket={timeBracket} />);
        componentArray.push(<HistorySingle key={new Date(history.created).getTime()} history={history} index={0} />);
        return;
      }
      const lastHistory = histories[index - 1];
      const lastHistoryDate = new Date(lastHistory.created);

      if(getTimeBracket(new Date(history.created)) === getTimeBracket(lastHistoryDate)){
        componentArray.push(<HistorySingle key={new Date(history.created).getTime()} history={history} index={index} />);
        return;
      }

      componentArray.push(<HistoryDateDivider key={timeBracket} timeBracket={timeBracket} />);
      componentArray.push(<HistorySingle key={new Date(history.created).getTime()} history={history} index={index} />);
      return;
    });
    // #endregion

  return(
    <SimpleBar className={styles.simplebar}>
      <Container className={styles.historiesList}  maxWidth={false}>
        {componentArray.map((component) => {return  component})}
      </Container>
    </SimpleBar>
  )
};