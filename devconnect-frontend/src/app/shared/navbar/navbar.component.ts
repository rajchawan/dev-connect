import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  // ✅ Import this
import { RouterModule } from '@angular/router';  // ✅ Also needed for routerLink

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],  // ✅ Add CommonModule and RouterModule
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }
}