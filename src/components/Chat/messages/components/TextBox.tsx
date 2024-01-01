import 'katex/dist/katex.min.css';
import { Container } from '@mui/material';
import Markdown from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import { useMediaQueryStore } from '../../../../_state/Page/mediaQueryStore';
import { Message } from '../../../../_types/Message';
import styles from '../_styles/messageStyles.module.css';
import { MessageIcon } from './MessageIcon';

interface ITexBox {
  message: Message;
  index: number;
}

export const TextBox: React.FC<ITexBox> = (props) => {
  const { frameSize } = useMediaQueryStore();
  const {message, index} = props;

  let textBoxStyles;

  // #region set textbox styles
  if(message.role === 'model'){
    if(frameSize === 'mobile') textBoxStyles = styles.textBoxModelMobile;
    else textBoxStyles = styles.textBoxModel;
  }else{
    if(frameSize === 'mobile') textBoxStyles = styles.textBoxUserMobile;
    else textBoxStyles = styles.textBoxUser;
  }
  // #endregion

  return(
    <Container id={textBoxStyles} key={message.parts + index}>
      {message.role === 'model'? <MessageIcon index={index} role='model' />: null}
        <Container id={message.role === 'model'? styles.textBoxTextModel: styles.textBoxTextUser}>
          <Markdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
            {message.parts}
          </Markdown>
          </Container>
      {message.role === 'user'? <MessageIcon index={index} role='user' />: null}
    </Container>
  )
};
