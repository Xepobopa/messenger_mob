import { EStoreReducer, TRootState } from '../../types';

export const getUserSelector = (state: TRootState) => state[EStoreReducer.user];
