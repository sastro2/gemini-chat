import { Container } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { Message } from '../../../../_types/Message';
import styles from '../_styles/messageStyles.module.css';
import { MessageIcon } from './MessageIcon';

interface ITexBox {
  message: Message;
  index: number;
}

export const TextBox: React.FC<ITexBox> = (props) => {
  const {message, index} = props;

  return(
    <Container className={message.role === 'model'? styles.textBoxModel: styles.textBoxUser} key={message.parts + index}>
      {message.role === 'model'? <MessageIcon index={index} role='model' />: null}
      <Container className={message.role === 'model'? styles.textBoxTextModel: styles.textBoxTextUser}>
        <ReactMarkdown className={styles.text}>{message.parts}</ReactMarkdown>
      </Container>
      {message.role === 'user'? <MessageIcon index={index} role='user' />: null}
    </Container>
  )
};
