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

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.auth.currentUser$.subscribe(user => {
      console.log('User received in profile component:', user); // ← DEBUG LINE
      this.user = user;
    });
  }
}
