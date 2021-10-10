import { bindActionCreators } from 'redux';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import type { RootState, AppDispatch } from '../redux/store';

import * as ingredietsActions from '../redux/actions/ingredientsActions';
import * as constructorActions from '../redux/actions/constructorActions';
import * as userActions from '../redux/actions/userActions';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const actions = {
  ...ingredietsActions,
  ...constructorActions,
  ...userActions,
};

export const useAppActions = () => {
  const dispatch = useAppDispatch();
  return bindActionCreators(actions, dispatch);
};
