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

export const editarCarrito = createAction(
  '[Objeto] Cambiar Precio',
  props<{ id: number; enCarrito: boolean ; Detalles: CompraDetalles }>()
);

export const cambioCarrito = createAction(
  '[Objeto] Cambiar Carrito',
  props<{ id: number; status: boolean }>()
);

export const cambioCantidadCarrito = createAction(
  '[Objeto] Cambia Cantidad y Costos',
  props<{ id: number; Detalles: CompraDetalles }>()
);