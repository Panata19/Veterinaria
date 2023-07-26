import { createReducer, on } from '@ngrx/store';
import { agregarObjeto, eliminarObjeto } from './app.actions';
import { AppState, Objeto } from './app.state';

const initialState: AppState = {
  objetos: []
};

export const appReducer = createReducer(
  initialState,
  on(agregarObjeto, (state, { objeto }) => ({
    ...state,
    objetos: [...state.objetos, objeto]
  })),
  on(eliminarObjeto, (state, { id }) => ({
    ...state,
    objetos: state.objetos.filter(objeto => objeto.id !== id)
  }))
);


