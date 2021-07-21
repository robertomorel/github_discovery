import { AxiosResponse } from 'axios';
import { localStoragePrefix, ProfileProps } from '../types';

import { Storage } from '../utils/storage';
import api from './api';

export const getProfiles = async (userName: string): Promise<ProfileProps[]> =>  {
  try {
    const { status, data: { items } }: AxiosResponse = await api.get(`search/users?q=${userName} in:login`);

    await Storage.set(localStoragePrefix+'search', userName);

    if (status !== 200)
      throw new Error(`An unknown error with status ${status} accours while trying to get profile data`);

    if (items.length === 0)
      throw new Error('No items were found. Try again with a different user name.');

    return items as ProfileProps[];

  } catch (err) {
    throw new Error(err);
  }
}
