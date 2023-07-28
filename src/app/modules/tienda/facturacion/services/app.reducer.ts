import { createReducer, on } from '@ngrx/store';
import { agregarObjeto, eliminarObjeto, cambiarPrecio } from './app.actions';
import { AppState, Objeto } from './app.state';
import { Detalles } from '../interfaces/CompraProducto';

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
    objetos: state.objetos.filter(objeto => objeto.Producto.id !== id)
  })),
  on(cambiarPrecio, (state, { id, detalles }) => ({
    ...state,
    objetos: state.objetos.map(objeto => {
      if (objeto.Producto.id === id) {
        return {
          ...objeto,
          Detalles: {
            ...detalles,
          }
        };
      }
      return objeto;
    })
  }))
);


