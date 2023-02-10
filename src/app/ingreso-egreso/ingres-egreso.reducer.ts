import { Action, createReducer, on } from '@ngrx/store';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { setItems, unSetItems } from './ingres-egreso.actions';

export interface State {
    items: IngresoEgreso[]| null;
}

export const initialState: State = {
  items: [],
}

const _ingresoEgresoReducer = createReducer(initialState,

    on(setItems, (state, {items}) => ({ ...state, items:[...items]})),
    on(unSetItems, state => ({ ...state, items:[]})),

);

export function ingresoEgresoReducer(state:State=initialState, action:Action) {
    return _ingresoEgresoReducer(state, action);
}
