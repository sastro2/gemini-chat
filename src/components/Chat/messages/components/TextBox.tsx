import { Container } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { Message } from '../../../../_types/Message';
import { StyleSheet } from '../../../../styleSheet';
import { MessageIcon } from './MessageIcon';

interface ITexBox {
  message: Message;
  index: number;
}

export const TextBox: React.FC<ITexBox> = (props) => {
  const {message, index} = props;

  return(
    <Container key={message.parts + index} style={{display: 'flex', justifyContent: message.role === 'model'? 'start':  'end', padding: '0.5%', gap: 10, position: 'relative'}} maxWidth={false}>
      {message.role === 'model'? <MessageIcon index={index} role='model' />: null}
      <Container style={{border: `${StyleSheet.background.messages.message} 0.01px solid`, borderRadius: message.role === 'model'? '2px 15px 15px 15px':  '15px 3px 15px 15px', width: 'auto', padding: '0 3% 0 3%', margin: 0, color: StyleSheet.characters, backgroundColor: StyleSheet.background.messages.message, letterSpacing: '0.3px'}} maxWidth={false}>
        <ReactMarkdown>{message.parts}</ReactMarkdown>
      </Container>
      {message.role === 'user'? <MessageIcon index={index} role='user' />: null}
    </Container>
  )
};