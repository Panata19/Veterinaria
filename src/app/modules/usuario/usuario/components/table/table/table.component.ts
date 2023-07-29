import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../interfaces/usuario.interface';
import { UsuarioService } from '../../../services/usuario.service';
import { MatDialog } from '@angular/material/dialog';
import { RegistroUsuarioComponent } from '../../modals/registro-usuario/registro-usuario.component';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  usuarios: Usuario[] = [];
  pagina = 1; // Número de página actual
  registrosPorPagina = 5; // Cantidad de registros por página

  constructor(
    private usuarioService: UsuarioService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.usuarioService.getUsuario().subscribe(usuarios => {
      console.log(usuarios);
      this.usuarios = usuarios;
    });
  }

  // Calcula el número total de páginas
  get totalPaginas(): number {
    return Math.ceil(this.usuarios.length / this.registrosPorPagina);
  }

  anteriorPagina(event: Event): void {
    event.preventDefault();
    if (this.pagina > 1) {
      this.pagina--;
    }
  }

  siguientePagina(event: Event): void {
    event.preventDefault();
    if (this.pagina < this.totalPaginas) {
      this.pagina++;
    }
  }

  irAPagina(event: Event, pagina: number): void {
    event.preventDefault();
    this.pagina = pagina;
  }

  // Método para obtener el rango de registros actual
  obtenerRangoRegistros(): string {
    const inicio = (this.pagina - 1) * this.registrosPorPagina + 1;
    const fin = Math.min(this.pagina * this.registrosPorPagina, this.usuarios.length);
    return `${inicio} - ${fin} de ${this.usuarios.length}`;
  }

  // Agrega este método en la clase TableComponent
  range(start: number, end: number): number[] {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }

  openModal(): void {
    const dialogRef = this.dialog.open(RegistroUsuarioComponent, {
      width: '500px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      // Actualizar la tabla u otras acciones después de cerrar el modal
    });
  }
}
