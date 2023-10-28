export const TIPO_FILTROS_HOSPITALIZACION = [
  { valor: 'nombrePaciente', texto: 'Nombre Paciente' }, 
  { valor: 'fechaNac',       texto: 'Fecha Nacimiento' },
  { valor: 'fechaIngreso',   texto: 'Fecha Ingreso' }
];

export const TIPO_FILTROS_HISTORIALCLINICO = [
  { valor: 'nombrePaciente', texto: 'Nombre Paciente' }, 
  { valor: 'fechaNac',       texto: 'Fecha Nacimiento' },
  { valor: 'fechaIngreso',   texto: 'Fecha Ingreso' }
];

export const TIPO_IMPUTS_HOSPITALIZACION  = Object.freeze(
  {
    ''              : { tipo: 'text', placeholder: 'Buscar...', disable: true  }, 
    'nombrePaciente': { tipo: 'text', placeholder: 'Buscar Paciente', disable: false },
    'fechaNac'      : { tipo: 'date', nombre: 'fechaNac',disable: false },
    'fechaIngreso'  : { tipo: 'date', nombre: 'fechaIngreso', disable: false },
  }
);

