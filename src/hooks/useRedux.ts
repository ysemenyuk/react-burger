import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import type { RootState, AppDispatch } from '../types/mainTypes';
import { AppThunk } from '../types/thunkTypes';

export const useAppDispatch = () => useDispatch<AppDispatch | AppThunk>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
