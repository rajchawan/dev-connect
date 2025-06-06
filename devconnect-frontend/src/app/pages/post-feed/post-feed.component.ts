import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { AuthService } from '../../services/auth.service';
import { formatDistanceToNow } from 'date-fns';

@Component({
  selector: 'app-post-feed',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './post-feed.component.html',
  styleUrls: ['./post-feed.component.scss']
})
export class PostFeedComponent implements OnInit {
  posts: any[] = [];
  currentUser: any;
  newPostContent: string = '';
  selectedImageFile: File | null = null;
  selectedImageName: string | null = null;

  constructor(
    private postService: PostService,
    private authService: AuthService
  ) {}

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

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedImageFile = input.files[0];
      this.selectedImageName = this.selectedImageFile.name;
    }
  }

  createPost(): void {
    if (!this.newPostContent.trim()) return;

    const formData = new FormData();
    formData.append('content', this.newPostContent.trim());
    if (this.selectedImageFile) {
      formData.append('image', this.selectedImageFile);
    }

    this.postService.createPost(formData).subscribe({
      next: (newPost) => {
        this.posts.unshift(newPost);
        this.newPostContent = '';
        this.selectedImageFile = null;
        this.selectedImageName = null;
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
