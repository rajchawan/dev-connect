import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any = null;
  skills: string = '';
  selectedAvatar: File | null = null;
  readonly API_URL = 'http://localhost:5000/api/users/me';
  readonly AVATAR_URL = 'http://localhost:5000/api/users/profile';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.http.get(this.API_URL, {
        headers: { Authorization: `Bearer ${token}` }
      }).subscribe({
        next: (data: any) => {
          this.user = data;
          this.skills = data.skills?.join(', ') || '';
        },
        error: (err) => console.error('Error fetching profile', err)
      });
    }
  }

  getAvatarUrl(): string {
    return this.user?.avatar
      ? `http://localhost:5000/uploads/${this.user.avatar}`
      : 'assets/icons/camera-icon.png';
  }

  onAvatarSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedAvatar = file;
      this.uploadAvatar();
    }
  }

  uploadAvatar(): void {
    if (!this.selectedAvatar) return;
  
    const formData = new FormData();
    formData.append('avatar', this.selectedAvatar);
    formData.append('name', this.user.name);
    formData.append('skills', this.skills); // comma-separated string
  
    const token = localStorage.getItem('token');
    this.http.put(this.AVATAR_URL, formData, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: (res) => this.ngOnInit(),
      error: (err) => console.error('Avatar upload failed', err)
    });
  }

  updateProfile(): void {
    const token = localStorage.getItem('token');
    const payload = {
      name: this.user.name,
      email: this.user.email,
      skills: this.skills.split(',').map(skill => skill.trim())
    };

    this.http.put(this.API_URL, payload, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: (data) => alert('Profile updated successfully!'),
      error: (err) => console.error('Update failed', err)
    });
  }
}
