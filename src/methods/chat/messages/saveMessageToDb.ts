import { ApiFetchFunctions } from '../../../_types/ApiFetchFunctions';
import { ApiMethods } from '../../../_types/ApiMethods';
import { Message } from '../../../_types/Message';
import apiFetch from '../../general/apiFetch';

export const saveMessagesToDb = async(messages: Message[], apiFetchFunctions: ApiFetchFunctions) => {
  const newDate = new Date().getTime();

  await apiFetch('/api/endpoints/messages/addMessages',ApiMethods.POST, {functions: apiFetchFunctions, body: {messages: messages, created: [newDate, newDate + 100]}});
};