import { SmartToyOutlined } from '@mui/icons-material';
import { Container } from '@mui/material';
import React from 'react';
import { useMediaQueryStore } from '../../../../_state/Page/mediaQueryStore';
import styles from '../_styles/messageStyles.module.css';

interface ITypingIndicator {}

export const TypingIndicator: React.FC<ITypingIndicator> = () => {
  const { frameSize } = useMediaQueryStore();

  return (
    <Container id={styles.typingIndicatorBox} maxWidth={false} disableGutters>
      <SmartToyOutlined id={frameSize === 'mobile'? styles.typingIndicatorIconMobile: styles.typingIndicatorIcon } fontSize={frameSize !== 'desktop'? 'medium': 'large'} />
      <span id={styles.typingIndicator}>
        <span>
          .
        </span>
        <span>
          .
        </span>
        <span>
          .
        </span>
      </span>
    </Container>
  )
};