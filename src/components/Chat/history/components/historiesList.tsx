import { Container } from '@mui/material';
import { ReactNode } from 'react';
import SimpleBar from 'simplebar-react';
import { useHistoryStore } from '../../../../_state/Chat/historyWindow/historyStore';
import { getTimeBracket } from '../../../../methods/chat/histories/getTimeBracket';
import { HistoryDateDivider } from './HistoryDateDivider';
import { HistorySingle } from './HistorySingle';

interface IHistoriesList {};

export const HistoriesList: React.FC<IHistoriesList> = () => {
  const {histories} = useHistoryStore();

  const componentArray: ReactNode[] = [];
  // #region history sorting
  const sortedHistories = histories.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());
    sortedHistories.forEach((history, index) => {
      const timeBracket = getTimeBracket(new Date(history.created));

      if(!componentArray[componentArray.length - 1]){
        componentArray.push(<HistoryDateDivider key={timeBracket} timeBracket={timeBracket} />);
        componentArray.push(<HistorySingle key={new Date(history.created).getTime()} history={history} index={0} />);
        return;
      };
      const lastHistory = sortedHistories[index - 1];
      const lastHistoryDate = new Date(lastHistory.created);

      if(getTimeBracket(new Date(history.created)) === getTimeBracket(lastHistoryDate)){
        componentArray.push(<HistorySingle key={new Date(history.created).getTime()} history={history} index={index} />);
        return;
      };

      componentArray.push(<HistoryDateDivider key={timeBracket} timeBracket={timeBracket} />);
      componentArray.push(<HistorySingle key={new Date(history.created).getTime()} history={history} index={index} />);
      return;
    });
    // #endregion

  return(
    <SimpleBar style={{display: 'flex', width: '100%', overflow: 'auto'}}>
      <Container style={{gap: '5px', display: 'flex', justifyContent: 'start', alignItems: 'start', flexDirection: 'column', width: '100%', padding: 0, paddingRight: '20px'}} maxWidth={false}>
        {componentArray.map((component) => {return  component})}
      </Container>
    </SimpleBar>
  )
};