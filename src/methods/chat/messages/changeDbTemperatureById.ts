import { ApiFetchFunctions } from '../../../_types/ApiFetchFunctions';
import { ApiMethods } from '../../../_types/ApiMethods';
import apiFetch from '../../general/apiFetch';

export const changeDbTemperatureById = async(id: number, temperature: number, apiFetchFunctions: ApiFetchFunctions) => {
  await apiFetch('/api/endpoints/histories/changeTemperatureById', ApiMethods.PATCH, {body: {id: id, historyTemperature: temperature}, functions: apiFetchFunctions});
};