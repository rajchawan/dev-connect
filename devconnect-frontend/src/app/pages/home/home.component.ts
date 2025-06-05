import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostFeedComponent } from '../post-feed/post-feed.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PostFeedComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  features = [
    {
      title: 'Secure Authentication',
      description: 'Your data is protected with industry-standard security practices.',
      image: 'assets/icons/auth.jpg'
    },
    {
      title: 'Admin Monitoring',
      description: 'Admins monitor and manage content to keep the community safe.',
      image: 'assets/icons/auth.jpg'
    },
    {
      title: 'Upload Posts',
      description: 'Share updates, knowledge, and inspiration with your network.',
      image: 'assets/icons/auth.jpg'
    },
    {
      title: 'Follow Other Users',
      description: 'Stay connected with developers you care about.',
      image: 'assets/icons/auth.jpg'
    },
    {
      title: 'Like Posts',
      description: 'Show appreciation for posts you enjoy.',
      image: 'assets/icons/auth.jpg'
    },
    {
      title: 'Connect with Developers',
      description: 'Build your network and discover new opportunities.',
      image: 'assets/icons/auth.jpg'
    },
    {
      title: 'Real-time Notifications',
      description: 'Stay updated with real-time activity and interactions.',
      image: 'assets/icons/auth.jpg'
    },
    {
      title: 'Comment on Posts',
      description: 'Join discussions and exchange ideas.',
      image: 'assets/icons/auth.jpg'
    }
  ];
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
