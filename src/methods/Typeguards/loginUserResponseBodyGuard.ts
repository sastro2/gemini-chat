import { LoginUserResponseBody } from '../../pages/api/endpoints/auth/loginUser';

export const loginUserResponseBodyGuard = (x: unknown): x is LoginUserResponseBody => {
  const val = typeof (x as LoginUserResponseBody).auth === 'boolean';

  return val;
};