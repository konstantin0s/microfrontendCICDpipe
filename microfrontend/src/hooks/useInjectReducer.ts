import { useEffect } from 'react';
import { useStore } from 'react-redux';
import { getInjectors } from '../utils/reducerInjectors';
import { InjectReducerParams, InjectedStore } from '../types';

const useInjectReducer = ({ key, reducer }: InjectReducerParams) => {
  const store = useStore() as InjectedStore;
  useEffect(() => {
    getInjectors(store).injectReducer(key, reducer);
  }, []);
};

export { useInjectReducer };
