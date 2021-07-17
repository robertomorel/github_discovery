import { GlobalState } from './store'
import { PropertyState } from './slices'

export const selectProperty = (state: GlobalState): PropertyState => state.property;
