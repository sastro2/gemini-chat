import { Error } from './Error';

export type DefaultApiResponseBody = {
    error: Error;
    auth: boolean;
}