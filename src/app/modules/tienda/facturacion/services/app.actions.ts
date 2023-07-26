import { createAction, props } from '@ngrx/store';
import { Objeto } from './app.state';

export const agregarObjeto = createAction(
  '[Objeto] Agregar',
  props<{ objeto: Objeto }>()
);

export const eliminarObjeto = createAction(
  '[Objeto] Eliminar',
  props<{ id: number }>()
);
