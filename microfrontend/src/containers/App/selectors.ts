import { createSelector } from 'reselect';
import { ApplicationRootState } from '../../types';

const selectGlobal = (state: ApplicationRootState) => state.globalMfeUi;

const makeSelectCurrentId = () =>
  createSelector(selectGlobal, app =>
    app && 'userId' in app ? app.userId : null,
  );

export { makeSelectCurrentId };
