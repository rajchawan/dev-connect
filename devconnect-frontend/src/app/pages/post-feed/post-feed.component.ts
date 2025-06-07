import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostService, Post } from '../../services/post.service';
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
  commentInputs: { [key: number]: string } = {};
  showComments: { [key: number]: boolean } = {};
  commentsMap: { [key: number]: any[] } = {};

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

  likePost(postId: number): void {
    this.postService.likePost(postId.toString()).subscribe({
      next: (updatedPost) => {
        const index = this.posts.findIndex(p => p.id === updatedPost.id);
        if (index > -1) this.posts[index].likesCount = updatedPost.likesCount;
      },
      error: (err) => console.error('Error liking post:', err)
    });
  }

  toggleComments(postId: number): void {
    if (this.showComments[postId]) {
      this.showComments[postId] = false;
    } else {
      this.showComments[postId] = true;
      this.postService.getPostComments(postId.toString()).subscribe({
        next: (comments) => this.commentsMap[postId] = comments,
        error: (err) => console.error('Error fetching comments:', err)
      });
    }
  }

  addComment(postId: number): void {
    const commentText = this.commentInputs[postId]?.trim();
    if (!commentText) return;

    this.postService.addComment(postId.toString(), commentText).subscribe({
      next: (comment) => {
        if (!this.commentsMap[postId]) this.commentsMap[postId] = [];
        this.commentsMap[postId].push(comment);
        this.commentInputs[postId] = '';
      },
      error: (err) => console.error('Error adding comment:', err)
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
