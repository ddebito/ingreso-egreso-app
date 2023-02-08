import { ActionReducerMap, createReducer, on } from '@ngrx/store';
import { Action, InitialState } from '@ngrx/store/src/models';

import { isLoading, stopLoading } from './ui.actions';


export interface State{
  isLoading:boolean;
}

export const initialState: State={
  isLoading: false,
}

const _uiReducer = createReducer(initialState,

  on(isLoading, state => ({...state, isLoading: true})),
  on(stopLoading, state => ({...state, stopLoading: false})),

  );

  export function uiReducer(state: any, action: Action){
    return _uiReducer(state, action);
  }
