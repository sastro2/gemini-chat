import { LoginData } from '../_Bundles/login/LoginData';
import { LoginMethods } from '../_Bundles/login/LoginMethods';

export const login = async(loginData: LoginData, loginDataMethods: LoginMethods): Promise<undefined>=> {
  if(!loginData.usernameInput || !loginData.passwordInput) return;

  const res = await fetch('http://localhost:3000/api/endpoints/auth/loginUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      usernameInput: loginData.usernameInput,
      passwordInput: loginData.passwordInput
    })
  });

  const parsedRes = await res.json();

  if(!parsedRes.auth) return;

  loginDataMethods.changeLoggedIn(parsedRes.auth);
  loginDataMethods.changeLoginDialogOpen(false);
  return;
};