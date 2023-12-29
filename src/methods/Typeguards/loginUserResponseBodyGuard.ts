import { LoginUserResponseBody } from '../../pages/api/endpoints/auth/loginUser';

export const loginUserResponseBodyGuard = (x: unknown): x is LoginUserResponseBody => {
  if(typeof x !== 'object' || x === null || !('auth' in x)) return false;
  const val = typeof (x as LoginUserResponseBody).auth === 'boolean';

  return val;
};