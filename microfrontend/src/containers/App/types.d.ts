import { ActionType } from 'typesafe-actions';
import { ApplicationRootState } from '../../types';
import * as actions from './actions';

/* --- STATE --- */
interface AppState {
  readonly isLoading: boolean;
  readonly userId: number | null;
}

interface SharedData {
  readonly userId: number | null;
}

/* --- ACTIONS --- */
type AppActions = ActionType<typeof actions>;

/* --- EXPORTS --- */

type RootState = ApplicationRootState;
type ContainerState = AppState;
type ContainerActions = AppActions;

export { RootState, ContainerState, ContainerActions, SharedData };
