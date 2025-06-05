// src/app/post-feed/post-feed.component.ts
import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { CommonModule } from '@angular/common';
import { formatDistanceToNow } from 'date-fns';

@Component({
  selector: 'app-post-feed',
  imports: [CommonModule],
  templateUrl: './post-feed.component.html',
  styleUrls: ['./post-feed.component.scss']
})
export class PostFeedComponent implements OnInit {
  posts: any[] = [];

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.postService.getAllPosts().subscribe({
      next: (data) => {
        this.posts = data;
      },
      error: (err) => {
        console.error('Error loading posts', err);
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
