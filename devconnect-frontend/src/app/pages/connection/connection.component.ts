import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-connection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.scss']
})
export class ConnectionComponent implements OnInit {
  following: any[] = [];
  followers: any[] = [];
  usersToFollow: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadConnections();
  }

  loadConnections(): void {
    const token = localStorage.getItem('token');
    this.http.get<any>('http://localhost:5000/api/users/connections', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).subscribe({
      next: (data) => {
        this.following = data.following;
        this.followers = data.followers;
        this.usersToFollow = data.usersToFollow;
      },
      error: (err) => {
        console.error('Failed to load connections:', err);
      }
    });
  }

  followUser(userId: number): void {
    const token = localStorage.getItem('token');
    this.http.post(`http://localhost:5000/api/users/${userId}/follow`, {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).subscribe({
      next: () => {
        this.loadConnections(); // Refresh the list
      },
      error: (err) => {
        console.error('Follow failed:', err);
      }
    });
  }

  getUserAvatar(avatar: string | null): string {
    return avatar
      ? `http://localhost:5000/uploads/${avatar}`
      : 'assets/icons/default-avatar.jpg'; // fallback
  }
}
