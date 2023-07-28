import { createReducer, on } from '@ngrx/store';
import { agregarObjeto, eliminarObjeto, editarCarrito, cambioCarrito } from './app.actions';
import { AppState } from './app.state';


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
    objetos: state.objetos.filter(objeto => objeto.Compra.Producto.id !== id)
  })),
  on(cambioCarrito, (state, { id, status }) => ({
    ...state,
    objetos: state.objetos.map(objeto => {
      if (objeto.Compra.Producto.id === id) {
        return {
          ...objeto,
          enCarrito: status,
        };
      }
      return objeto;
    })
  })),
  on(editarCarrito, (state, { id, enCarrito, Detalles }) => ({
    ...state,
    objetos: state.objetos.map(objeto => {
      if (objeto.Compra.Producto.id === id) {
        return {
          ...objeto,
          enCarrito: enCarrito,
          Detalles: {
            ...Detalles,
          }
        };
      }
      return objeto;
    })
  }))
);


