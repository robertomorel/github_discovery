import { AxiosResponse } from 'axios';
import { ProfileProps } from '../types';
import api from './api';

export const getProfiles = async (userName: string): Promise<ProfileProps[]> =>  {
  try {
    const { status, data: { items } }: AxiosResponse = await api.get(`search/users?q=${userName} in:login`);

    if (status !== 200)
      throw new Error(`An unknown error with status ${status} accours while trying to get profile data`);

    return items as ProfileProps[];

  } catch (err) {
    throw new Error(err);
  }
}
