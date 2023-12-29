import { Container, Typography } from '@mui/material';
import styles from '../_styles/historyStyles.module.css';

interface IHistoryDateDivider {
  timeBracket: 'today' | 'yesterday' | 'week' | 'month' | 'jan' | 'feb' | 'mar' | 'apr' | 'may' | 'jun' | 'jul' | 'aug' | 'sep' | 'okt' | 'nov' | 'dec' | 'year';
}

export const HistoryDateDivider: React.FC<IHistoryDateDivider> = ({timeBracket}) => {
  let text = '';

  switch(timeBracket) {
    case 'today':
      text = 'Today';
      break;
    case 'yesterday':
      text = 'Yesterday';
      break;
    case 'week':
      text = 'This week';
      break;
    case 'month':
      text = 'This month';
      break;
    case 'jan':
      text = 'January';
      break;
    case 'feb':
      text = 'February';
      break;
    case 'mar':
      text = 'March';
      break;
    case 'apr':
      text = 'April';
      break;
    case 'may':
      text = 'May';
      break;
    case 'jun':
      text = 'June';
      break;
    case 'jul':
      text = 'July';
      break;
    case 'aug':
      text = 'August';
      break;
    case 'sep':
      text = 'September';
      break;
    case 'okt':
      text = 'October';
      break;
    case 'nov':
      text = 'November';
      break;
    case 'dec':
      text = 'December';
      break;
    case 'year':
      text = 'Long ago';
      break;
    default:
      text = 'Today';
  }

  return (
    <Container id={styles.historyDateDivider}>
      <Typography fontSize='small'>{text}</Typography>
    </Container>
  )
};