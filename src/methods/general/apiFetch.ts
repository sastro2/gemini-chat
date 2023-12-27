import { defaultCurrentMessageHistory } from '../../_state/Chat/messageWindow/messagesStore';
import { ApiFetchFunctions } from '../../_types/ApiFetchFunctions';
import { ApiMethods } from '../../_types/ApiMethods';

export type ApiFetchOptions = {
  functions: ApiFetchFunctions;
  body?: Object,
  singal?: AbortSignal;
};

export type ApiFetchOptionsServer = {
  username: string;
  accessToken: string;
  body?: Object,
  singal?: AbortSignal;
};

export type FetchOptions = ApiFetchOptions | ApiFetchOptionsServer;

//type guard to check whether the options are for server side prefetching
const prefetching = (options: FetchOptions): options is ApiFetchOptionsServer => {
  const prefetch = typeof (options as ApiFetchOptionsServer).username === 'string';

  return prefetch;
};

async function apiFetch(url: string, method: ApiMethods, options: ApiFetchOptions): Promise<any>;
async function apiFetch(url: string, method: ApiMethods, options: ApiFetchOptionsServer): Promise<any>;
async function apiFetch(url: string, method: ApiMethods, options: FetchOptions): Promise<any> {
  if(prefetching(options)){
    const response = await fetch(process.env.DOMAIN_URL + url, {
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

    const data = await response.json();

    return data;
  };

  const { changeLoggedIn, clearHistories, changeCurrentMessageHistory, changeError, changeErrorSnackbarOpen } = options.functions;

  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    signal: options.singal,
    body: JSON.stringify({...options.body}),
  });

  const data = await response.json();
  console.log(data.error);

  // #region log errors
  if(data.status === 401) {
    changeLoggedIn(false);
    clearHistories();
    changeCurrentMessageHistory(defaultCurrentMessageHistory);

    if(data.error.errorId !== 0){
      changeError(data.error);
      changeErrorSnackbarOpen(true);
    };

    return;
  };

  if(data.error.errorId !== 0){
    changeError(data.error);
    changeErrorSnackbarOpen(true);

    return;
  };

  return data;
};

export default apiFetch;
