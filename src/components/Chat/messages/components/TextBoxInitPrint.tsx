import { Container } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { Message } from '../../../../_types/Message';
import styles from '../_styles/messageStyles.module.css';
import { MessageIcon } from './MessageIcon';

interface ITextBoxInitPrint {
  message: Message;
  index: number;
  textToRender: string;
}

export const TextBoxInitPrint: React.FC<ITextBoxInitPrint> = (props) => {
  const {message, index, textToRender} = props;

  return(
    <Container id={message.role === 'model'? styles.textBoxModel: styles.textBoxUser}>
      {message.role === 'model'? <MessageIcon index={index} role='model' />: null}
      <Container id={message.role === 'model'? styles.textBoxTextModel: styles.textBoxTextUser}>
        <ReactMarkdown>{textToRender}</ReactMarkdown>
      </Container>
      {message.role === 'user'? <MessageIcon index={index} role='user' />: null}
    </Container>
  )
};