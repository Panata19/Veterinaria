export const TIPO_IMPUTS_HOSPITALIZACION  = Object.freeze(
  {
    ''               : { tipo: 'text', placeholder: 'Buscar...', disable: true }, 
    'NOMBRE_PACIENTE': { tipo: 'text', placeholder: 'Buscar Paciente', disable: false},
    'FECHA_NAC'      : { tipo: 'date', nombre: 'fechaNac', disable: false },
    'FECHA_INGRESO'  : { tipo: 'date', nombre: 'fechaIngreso', disable: false },
    'TODOS'          : { tipo: '',     placeholder: '', disable: true}
  }
);

export const TIPO_FILTROS_HOSPITALIZACION = [
  { valor: 'nombrePaciente', texto: 'Nombre Paciente' }, 
  { valor: 'fechaNac',       texto: 'Fecha Nacimiento' },
  { valor: 'fechaIngreso',   texto: 'Fecha Ingreso' }
];
