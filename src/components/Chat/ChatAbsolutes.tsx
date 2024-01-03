import BugReportIcon from '@mui/icons-material/BugReport';
import { Container, Link, LinkProps } from '@mui/material';
import { useErrorStore } from '../../_state/InputResponse/errorStore';
import { useMediaQueryStore } from '../../_state/Page/mediaQueryStore';
import styles from './_styles/chatStyles.module.css';
import { VertMenu } from './history/components/VertMenu';

interface IChatAbsolutes {}

const bugLinkProps: LinkProps = {
  target: '_blank',
  href: 'https://docs.google.com/forms/d/e/1FAIpQLSdeYGmzArgg5yrtOgAGf9bDxvIHQIpZ_EfeEluEPOQVy-jfzg/viewform?usp=sf_link#'
}

export const ChatAbsolutes: React.FC<IChatAbsolutes> = () => {
  const { error } = useErrorStore();
  const { frameSize } = useMediaQueryStore();

  return(
    <>
      {frameSize === 'desktop'?
      <Container id={styles.bugReportContainer}>
        <Link id={styles.bugReportLink} {...bugLinkProps} href={`${bugLinkProps.href}${error.errorId}${error.errorCode}`}>
          <BugReportIcon id={styles.bugReportIcon} />
        </Link>
        <VertMenu />
      </Container>: null}
    </>
  )
};
