import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';
import { Usuario } from '../../usuario/usuario/interfaces/usuario.interface';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usuarioAutenticado: Usuario | null = null;
  private localStorageKey = 'usuarioAutenticado';

  constructor(private http: HttpClient) {
    const storedUsuario = localStorage.getItem(this.localStorageKey);
    if (storedUsuario) {
      this.usuarioAutenticado = JSON.parse(storedUsuario);
    }
  }

  // Realiza el inicio de sesión y devuelve un Observable booleano indicando si el inicio de sesión fue exitoso
  login(email: string, password: string): Observable<boolean> {
    return this.http.get<Usuario[]>('http://localhost:3000/usuarios').pipe(
      map((usuarios: Usuario[]) => {
        // Busca en la lista de usuarios si hay alguna coincidencia con el correo y la contraseña proporcionados
        const usuarioAutenticado = usuarios.find(usuario => usuario.correo === email && usuario.contrasenia === password);
        if (usuarioAutenticado) {
          // Establece el usuario autenticado y lo guarda en el localStorage
          this.usuarioAutenticado = usuarioAutenticado;
          localStorage.setItem(this.localStorageKey, JSON.stringify(usuarioAutenticado));
          return true; // Inicio de sesión exitoso
        } else {
          return false; // Credenciales inválidas
        }
      })
    );
  }

  // Verifica si hay un usuario autenticado y devuelve un Observable booleano
  verificaAutenticacion(): Observable<boolean> {
    return of(this.usuarioAutenticado !== null);
  }

  // Devuelve el usuario autenticado o null si no hay ninguno
  obtenerUsuarioAutenticado(): Usuario | null {
    return this.usuarioAutenticado;
  }

  // Cierra la sesión del usuario y limpia la información del localStorage
  logout(): void {
    this.usuarioAutenticado = null;
    localStorage.removeItem(this.localStorageKey);
  }
}
