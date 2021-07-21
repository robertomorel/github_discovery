import { GlobalState } from './store'
import { ProfileState } from './slices'

export const selectProfile = (state: GlobalState): ProfileState => state.profile;
