import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // ✅ Import FormsModule
import { PostService } from '../../services/post.service';
import { AuthService } from '../../services/auth.service';
import { formatDistanceToNow } from 'date-fns';

@Component({
  selector: 'app-post-feed',
  standalone: true,
  imports: [CommonModule, FormsModule], // ✅ Add FormsModule here
  templateUrl: './post-feed.component.html',
  styleUrls: ['./post-feed.component.scss']
})
export class PostFeedComponent implements OnInit {
  posts: any[] = [];
  currentUser: any;
  newPostContent: string = '';

  constructor(private postService: PostService, private authService: AuthService) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.loadPosts();
  }

  loadPosts(): void {
    this.postService.getAllPosts({ limit: 100 }).subscribe({
      next: (data) => {
        this.posts = data;
      },
      error: (err) => {
        console.error('Error loading posts', err);
      }
    });
  }

  createPost(): void {
    if (!this.newPostContent.trim()) return;

    this.postService.createPost({ content: this.newPostContent }).subscribe({
      next: (newPost) => {
        this.posts.unshift(newPost);
        this.newPostContent = '';
      },
      error: (err) => {
        console.error('Error creating post', err);
      }
    });
  }

  getUserAvatar(avatar: string | undefined): string {
    return avatar
      ? `http://localhost:5000/uploads/${avatar}`
      : 'assets/icons/default-avatar.jpg';
  }

  getTimeAgo(dateString: string): string {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true });
  }
}
