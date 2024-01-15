import { ErrorSnackbar } from './components/ErrorSnackbar';
import { SuccessSnackbar } from './components/SuccessSnackbar';

interface IAppAbsolutes {}

export const AppAbsolutes: React.FC<IAppAbsolutes> = () => {
  return(
    <>
      <ErrorSnackbar />
      <SuccessSnackbar />
    </>
  )
};
