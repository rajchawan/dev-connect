import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; // ✅ <-- Import this

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule], // ✅ <-- Add FormsModule here
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  searchText = '';

  constructor(private router: Router) {} // ✅ <-- Add constructor to inject Router

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }

  onSearch() {
    const query = this.searchText.trim();
    if (query) {
      this.router.navigate(['/search'], { queryParams: { q: query } });
    }
  }
}
