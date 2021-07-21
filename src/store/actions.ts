import { AppThunk } from './store';

import {
  actionRequestProfileStart,
  actionCreateNewProfileSuccess,
  actionCreateNewProfileFailure,
  actionFetchProfileListSuccess,
  actionFetchProfileListFailure,
} from './slices'
import { Storage } from '../utils/storage'
//import { selectProfile } from './selectors'
import { ProfileProps } from '../types';

export const actionRequestProfile = (profileData: ProfileProps[]): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(actionRequestProfileStart())

    const mappedData = profileData.map(({login, type, avatar_url})=>({login, type, avatar_url}))

    console.log('>>> ', JSON.stringify(mappedData, null, 2));

    await Storage.set('profileList', JSON.stringify(mappedData))
    dispatch(actionCreateNewProfileSuccess(mappedData))

  } catch (err) {
    const reason = String(err)
    dispatch(actionCreateNewProfileFailure(reason))
    throw reason
  }
}

export const actionFetchProfileList = (): AppThunk => async dispatch => {
  try {
    dispatch(actionRequestProfileStart())

    const storedProfileList = await Storage.get('profileList');
    const profileList: ProfileProps[] | undefined = storedProfileList ? JSON.parse(storedProfileList) : undefined;

    dispatch(actionFetchProfileListSuccess(profileList))
  } catch (err) {
    dispatch(actionFetchProfileListFailure(String(err)))
  }
}

/** @todo: create fetch actions to recover profile data from storage and update data */
