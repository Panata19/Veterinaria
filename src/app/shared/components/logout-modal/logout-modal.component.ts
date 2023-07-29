import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-logout-modal',
  templateUrl: './logout-modal.component.html',
  styles: []
})
export class LogoutModalComponent implements OnInit {
  @ViewChild('logoutModal') logoutModal!: ElementRef;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void { }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
    this.closeModal();
  }

  private closeModal(): void {
    this.logoutModal.nativeElement.querySelector('.close').click();
  }
}
