import {
  getPersistedData,
  setPersistedValue,
} from '../../utils/storePersistance';
import ActionTypes from './constants';
import { ContainerState, ContainerActions } from './types';

const persistId = 'app';
const initialId = getPersistedData(persistId)?.userId;

export const initialState: ContainerState = {
  isLoading: false,
  userId: initialId ? JSON.parse(initialId) : null,
};

const appReducer = (
  state: ContainerState = initialState,
  action: ContainerActions,
): ContainerState => {
  switch (action.type) {
    case ActionTypes.SET_CURRENT_ID:
      setPersistedValue(persistId, 'userId', JSON.stringify(action.payload));
      return {
        ...state,
        userId: action.payload,
      };
    default:
      return state;
  }
};

export default appReducer;
