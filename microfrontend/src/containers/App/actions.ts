import { action } from 'typesafe-actions';
import ActionTypes from './constants';

const setCurrentId = (id: number) => action(ActionTypes.SET_CURRENT_ID, id);

export { setCurrentId };
