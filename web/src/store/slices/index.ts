import { combineReducers } from '@reduxjs/toolkit';

import { propertySlice } from './property';

export * from './property';

export const rootReducer = combineReducers({
  property: propertySlice.reducer,
});
