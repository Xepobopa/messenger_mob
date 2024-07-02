import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { TRootState } from './types';
import { getUserSelector } from './modules';

export const useTypedSelector: TypedUseSelectorHook<TRootState> = useSelector;

export const useUserData = () => useTypedSelector(getUserSelector);
