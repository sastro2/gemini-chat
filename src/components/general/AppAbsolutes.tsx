import { ErrorSnackbar } from './ErrorSnackbar';
import { SuccessSnackbar } from './SuccessSnackbar';

interface IAppAbsolutes {}

export const AppAbsolutes: React.FC<IAppAbsolutes> = () => {
  return(
    <>
      <ErrorSnackbar />
      <SuccessSnackbar />
    </>
  )
};
