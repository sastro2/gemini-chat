import { defaultCurrentMessageHistory } from '../../_state/Chat/messageWindow/messagesStore';
import { ApiFetchFunctions } from '../../_types/ApiFetchFunctions';
import { ApiMethods } from '../../_types/ApiMethods';
import { Error } from '../../_types/Error';
import { apiFetchResultGuard } from '../Typeguards/apiFetchBodyGuard';
import { apiFetchOptionsServerGuard } from '../Typeguards/apiFetchOptionsServerGuard';

export type ApiFetchBody = {
  [key: string]: unknown;
};

export type ApiFetchResult = {
  error: Error;
  auth: boolean;
  [key: string]: unknown;
};

export type ApiFetchOptions = {
  functions: ApiFetchFunctions;
  body?: Record<string, unknown>;
  singal?: AbortSignal;
};

export type ApiFetchOptionsServer = {
  username: string;
  accessToken: string;
  body?: Record<string, unknown>;
  singal?: AbortSignal;
};

export type FetchOptions = ApiFetchOptions | ApiFetchOptionsServer;

async function apiFetch(url: string, method: ApiMethods, options: ApiFetchOptions): Promise<ApiFetchBody>;
async function apiFetch(url: string, method: ApiMethods, options: ApiFetchOptionsServer): Promise<ApiFetchBody>;
async function apiFetch(url: string, method: ApiMethods, options: FetchOptions): Promise<ApiFetchBody> {
  //if the options are of type ApiFetchOptionsServer, then the request is being made from the server
  if(apiFetchOptionsServerGuard(options)){
    const response: Response = await fetch(process.env.DOMAIN_URL + url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      signal: options.singal,
      body: JSON.stringify({
        username: options.username,
        accessToken: options.accessToken,
        ...options.body,
      }),
    });

    const data: unknown = await response.json();

    //if the data is not of type ApiFetchBody, then return an empty object
    if(!apiFetchResultGuard(data)){
      return {error: {errorId: 0, errorCode: 0}, body: {}};
    }

    return data;
  }

  const { changeLoggedIn, clearHistories, changeCurrentMessageHistory, changeError, changeErrorSnackbarOpen } = options.functions;

  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    signal: options.singal,
    body: JSON.stringify({...options.body}),
  });

  const data: unknown = await response.json();

  //if the data is not of type ApiFetchBody, then return an empty object
  if(!apiFetchResultGuard(data)){
    return {error: {errorId: 0, errorCode: 0}, body: {}};
  }

  // destructuring the data object to remove the error property from the return
  const { error, ...returnVal } = data;

  // #region error handling
  if(response.status === 401) {
    changeLoggedIn(false);
    clearHistories();
    changeCurrentMessageHistory(defaultCurrentMessageHistory);

    if(error.errorId !== 0){
      changeError(error);
      changeErrorSnackbarOpen(true);
    }

    return {error: {errorId: 0, errorCode: 0}, body: {}};
  }

  if(error.errorId !== 0){
    changeError(data.error);
    changeErrorSnackbarOpen(true);
  }
  // #endregion

  return returnVal;
}

export default apiFetch;
