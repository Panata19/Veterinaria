
export function estadoStock(cantidad: number): string{
  let status;
  switch (true) {
    case cantidad > 10:
      status = 'DISPONIBLE';
      break;
    case cantidad > 0 && cantidad <= 10:
      status = 'BAJO STOCK';
      break;
    case cantidad === 0:
      status = 'AGOTADO';
      break;
    default:
      status = "UNKNOWN"
      break;
  }
  return status;
}