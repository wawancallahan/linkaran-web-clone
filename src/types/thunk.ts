import { AppActions } from './index';
import { ThunkAction } from 'redux-thunk';
import { AppState } from '../reducers';

export type ThunkResult<R> = ThunkAction<R, AppState, any, AppActions>;
