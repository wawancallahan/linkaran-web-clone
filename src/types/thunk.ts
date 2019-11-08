import { AppActions } from './index';
import { ThunkAction } from 'redux-thunk';

export type ThunkResult<R> = ThunkAction<R, any, any, AppActions>;
