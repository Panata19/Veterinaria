import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Usuario } from 'src/app/modules/usuario/usuario/interfaces/usuario.interface';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;
  showPassword = false;
  credencialesInvalidas = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  // Método para manejar el inicio de sesión
  login(): void {
    this.submitted = true;

    if (this.loginForm.invalid) {
      console.log('Login inválido');
      return;
    }

    const email = this.loginForm.controls?.['email'].value;
    const password = this.loginForm.controls?.['password'].value;

    this.authService.login(email, password).subscribe((autenticado: boolean) => {
      if (autenticado) {
        console.log('Inicio de sesión exitoso');
        this.router.navigate(['./home']);
      } else {
        console.log('Credenciales inválidas');
        this.credencialesInvalidas = true;
        // Manejar credenciales inválidas, mostrar mensaje de error, etc.
      }

      // Restablecer el formulario después del envío exitoso
      this.loginForm.reset();
      this.submitted = false;
    });
  }

  // Método para alternar la visibilidad de la contraseña
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
