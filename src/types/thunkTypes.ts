import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import { RootState, TAppActions } from '../redux/store';

export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TAppActions>
>;
