import { combineReducers } from '@reduxjs/toolkit';

import { profileSlice } from './profile';

export * from './profile';

export const rootReducer = combineReducers({
  profile: profileSlice.reducer,
});
