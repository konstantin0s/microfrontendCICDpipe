import { useEffect } from 'react';
import { useStore } from 'react-redux';
import { getInjectors } from '../utils/sagaInjectors';
import { InjectedStore, InjectSagaParams } from '../types';

const useInjectSaga = ({ key, saga, mode }: InjectSagaParams) => {
  const store = useStore() as InjectedStore;
  useEffect(() => {
    const injectors = getInjectors(store);
    injectors.injectSaga(key, { saga: saga, mode: mode });

    return () => {
      injectors.ejectSaga(key);
    };
  }, []);
};

export { useInjectSaga };
