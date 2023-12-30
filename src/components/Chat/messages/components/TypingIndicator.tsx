import { SmartToyOutlined } from '@mui/icons-material';
import { Container } from '@mui/material';
import React from 'react';
import styles from '../_styles/messageStyles.module.css';

interface ITypingIndicator {}

export const TypingIndicator: React.FC<ITypingIndicator> = () => {
  return (
    <Container id={styles.typingIndicatorBox} maxWidth={false} disableGutters>
      <SmartToyOutlined id={styles.typingIndicatorIcon} fontSize='large' />
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