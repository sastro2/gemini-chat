import { ApiFetchFunctions } from '../../../_types/ApiFetchFunctions';
import { ApiMethods } from '../../../_types/ApiMethods';
import { Message } from '../../../_types/Message';
import apiFetch from '../../general/apiFetch';

export const saveMessageToDb = async(message: Message, apiFetchFunctions: ApiFetchFunctions) => {
  await apiFetch('/api/endpoints/messages/addMessage',ApiMethods.POST, {functions: apiFetchFunctions, body: {message: message}});
};