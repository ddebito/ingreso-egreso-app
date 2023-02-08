import { Action, createReducer, on } from '@ngrx/store';
import { Usuario } from '../models/usuario.models';
import * as actions from './auth.actions';

export interface StateModel {
  user: Usuario | null;
}

export const initialState: StateModel = {
  user: null
};

const _authReducer = createReducer(
  initialState,
  on(actions.setUser, (state, {user}) => ({...state, user: {...user}})),
  on(actions.unSetUser, (state) => ({...state, user: null}))
);

export function authReducer(state: StateModel = initialState, action: Action) {
  return _authReducer(state, action);
}
