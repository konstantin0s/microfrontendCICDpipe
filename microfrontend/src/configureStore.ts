import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import createReducer from './reducers';
import { InjectedStore } from './types';
import { MFE_UI_NAMESPACE } from './variables';

declare interface IWindow extends Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any; // redux-dev-tools definitions not needed
}
declare const window: IWindow;

export default function configureStore(initialState = {}) {
  let composeEnhancers = compose;
  const reduxSagaMonitorOptions = {};

  // If Redux Dev Tools and Saga Dev Tools Extensions are installed, enable them
  if (process.env.NODE_ENV !== 'production' && typeof window === 'object') {
    if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
      composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        name: MFE_UI_NAMESPACE,
        trace: true,
        traceLimit: 25,
      });
    }

    // NOTE: Uncomment the code below to restore support for Redux Saga
    // Dev Tools once it supports redux-saga version 1.x.x
    // if (window.__SAGA_MONITOR_EXTENSION__)
    //   reduxSagaMonitorOptions = {
    //     sagaMonitor: window.__SAGA_MONITOR_EXTENSION__,
    //   };
  }

  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);

  // Create the store with middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  const middlewares = [sagaMiddleware];

  const enhancers = [applyMiddleware(...middlewares)];

  const store = createStore(
    createReducer(),
    initialState,
    composeEnhancers(...enhancers),
  ) as InjectedStore;

  // Extensions
  store.runSaga = sagaMiddleware.run;
  store.injectedReducers = {}; // Reducer registry
  store.injectedSagas = {}; // Saga registry

  // Make reducers hot reloadable, see http://mxs.is/googmo
  if (module['hot']) {
    module['hot'].accept('./reducers', () => {
      store.replaceReducer(createReducer(store.injectedReducers));
    });
  }

  return { store };
}
