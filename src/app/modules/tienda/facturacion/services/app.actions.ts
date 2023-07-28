import { createAction, props } from '@ngrx/store';
import { CompraDetalles, Objeto } from './app.state';

export const agregarObjeto = createAction(
  '[Objeto] Agregar',
  props<{ objeto: Objeto }>()
);

export const eliminarObjeto = createAction(
  '[Objeto] Eliminar',
  props<{ id: number }>()
);

export const cambiarPrecio = createAction(
  '[Objeto] Cambiar Precio',
  props<{ id: number; StoreState: boolean; Detalles: CompraDetalles }>()
);
