import { Container } from '@mui/material';
import React from 'react';
import styles from '../_styles/messageStyles.module.css';

interface ITypingIndicator {}

export const TypingIndicator: React.FC<ITypingIndicator> = () => {
  return (
    <Container maxWidth={false} disableGutters>
      <span className={styles.typingIndicator}>...</span>
    </Container>
  )
};