import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css']
})
export class RegistroUsuarioComponent implements OnInit {
  usuarioForm!: FormGroup;
  nombreUsuario: string = '';
  contrasenia: string = '';
  correo: string = '';
  showPassword: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<RegistroUsuarioComponent>,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.usuarioForm = this.formBuilder.group({
      nombreUsuario: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(13)]],
      contrasenia: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      correo: ['', [Validators.required, Validators.email]]
    });
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  getPasswordStrengthClass(): string {
    const passwordStrength = this.getPasswordStrength();
    if (passwordStrength < 33) {
      return 'bg-danger';
    } else if (passwordStrength < 66) {
      return 'bg-warning';
    } else {
      return 'bg-success';
    }
  }

  getPasswordStrengthPercentage(): number {
    return this.getPasswordStrength();
  }

  private getPasswordStrength(): number {
    const password = this.contrasenia;
    if (password.length === 0) {
      return 0;
    }
    const lowercaseRegex = /[a-z]/;
    const uppercaseRegex = /[A-Z]/;
    const numberRegex = /[0-9]/;
    const symbolRegex = /[!@#$%^&*]/;
    let strength = 0;
    if (lowercaseRegex.test(password)) {
      strength += 25;
    }
    if (uppercaseRegex.test(password)) {
      strength += 25;
    }
    if (numberRegex.test(password)) {
      strength += 25;
    }
    if (symbolRegex.test(password)) {
      strength += 25;
    }
    return strength;
  }

  getPasswordStrengthText(): string {
    const passwordStrength = this.getPasswordStrength();
    if (passwordStrength < 33) {
      return 'Baja';
    } else if (passwordStrength < 66) {
      return 'Media';
    } else {
      return 'Alta';
    }
  }
}


