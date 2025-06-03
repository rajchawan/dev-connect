// profile.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any;
  loading = true; // Track loading state
  error: string | null = null; // Track errors

  constructor(private auth: AuthService) {}

  ngOnInit() {
    // Subscribe to currentUser$ for real-time updates
    this.auth.currentUser$.subscribe({
      next: (user) => {
        this.user = user;
        this.loading = false;
        console.log('Current user from observable:', user); // Debug log
      },
      error: (err) => {
        this.error = 'Failed to load user data';
        this.loading = false;
        console.error('Error in currentUser$ subscription:', err);
      }
    });

    // Fetch user if not in localStorage and token exists
    if (!this.auth.getCurrentUser() && this.auth.isLoggedIn()) {
      this.auth.fetchCurrentUser().subscribe({
        next: (user) => {
          console.log('Fetched user:', user); // Debug log
        },
        error: (err) => {
          this.error = 'Failed to fetch user data';
          this.loading = false;
          console.error('Error fetching user:', err);
        }
      });
    } else if (!this.auth.isLoggedIn()) {
      this.loading = false;
      this.error = 'Please log in to view your profile';
    }
  }
}