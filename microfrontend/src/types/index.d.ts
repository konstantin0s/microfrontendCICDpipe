import { Reducer, Store } from 'redux';
import { ContainerState as AppState } from '../containers/App/types';

interface InjectedStore extends Store {
  injectedReducers: any;
  injectedSagas: any;
  runSaga(saga: () => IterableIterator<any>, args: any): any;
}

interface InjectReducerParams {
  key: keyof ApplicationRootState;
  reducer: Reducer<any, any>;
}

interface InjectSagaParams {
  key: keyof ApplicationRootState;
  saga: () => IterableIterator<any>;
  mode?: string | undefined;
}

interface ApplicationRootState {
  readonly globalMfeUi: AppState;
}

export {
  InjectedStore,
  InjectReducerParams,
  InjectSagaParams,
  ApplicationRootState,
};
