import { Container } from '@mui/material';

interface IMessagesWindow {}

export const MessagesWindow: React.FC<IMessagesWindow> = () => {
  return <Container style={{ height: '100%', display: 'flex', border: 'gray 1px solid', padding: 0 }} maxWidth={false} />;
};
