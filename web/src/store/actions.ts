import { AppThunk } from './store';

import {
  actionRequestPropertyStart,
  actionCreateNewPropertySuccess,
  actionCreateNewPropertyFailure,
  actionFetchPropertyListSuccess,
  actionFetchPropertyListFailure,
} from './slices'
import { Storage } from '../utils/storage'
//import { selectProperty } from './selectors'
import { PropertyProps } from '../types';

export const actionRequestProperty = (propertyData: PropertyProps[]): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(actionRequestPropertyStart())

    console.log('>>> ', propertyData)

    //const { property } = selectProperty(getState())
    //const propertyList: PropertyProps[] | undefined = property ? { ...propertyData } : undefined;

    await Storage.set('propertyList', JSON.stringify(propertyData))
    dispatch(actionCreateNewPropertySuccess(propertyData))

  } catch (err) {
    const reason = String(err)
    dispatch(actionCreateNewPropertyFailure(reason))
    throw reason
  }
}

export const actionFetchPropertyList = (): AppThunk => async dispatch => {
  try {
    dispatch(actionRequestPropertyStart())

    const storedPropertyList = await Storage.get('propertyList');
    const propertyList: PropertyProps[] | undefined = storedPropertyList ? JSON.parse(storedPropertyList) : undefined;

    dispatch(actionFetchPropertyListSuccess(propertyList))
  } catch (err) {
    dispatch(actionFetchPropertyListFailure(String(err)))
  }
}

/** @todo: create fetch actions to recover property data from storage and update data */
