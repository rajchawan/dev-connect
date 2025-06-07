import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Optional: define interfaces for strong typing
export interface Post {
  id: number;
  content: string;
  createdAt: string;
  user: {
    id: number;
    name: string;
    email?: string;
    avatar?: string;
  };
  likesCount: number;
  commentsCount: number;
  image?: string;
}

export interface Comment {
  id: string;
  text: string;
  createdAt: string;
  user: {
    id: number;
    name: string;
    avatar?: string;
  };
  likes: string[];
}

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private postApiUrl = 'http://localhost:5000/api/posts';
  private commentApiUrl = 'http://localhost:5000/api/comments';

  constructor(private http: HttpClient) {}

  // Get all posts with optional query params
  getAllPosts(params?: any): Observable<Post[]> {
    return this.http.get<Post[]>(this.postApiUrl, {
      withCredentials: true,
      params
    });
  }

  // Create post with content + optional image
  createPost(data: FormData): Observable<Post> {
    return this.http.post<Post>(this.postApiUrl, data, { withCredentials: true });
  }

  // Like a post
  likePost(postId: string): Observable<Post> {
    return this.http.put<Post>(`${this.postApiUrl}/${postId}/like`, {}, { withCredentials: true });
  }

  // Add a comment to a post
  addComment(postId: string, text: string): Observable<Comment> {
    return this.http.post<Comment>(`${this.commentApiUrl}/${postId}`, { postId, text }, { withCredentials: true });
  }

  // Get all comments for a post
  getPostComments(postId: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.postApiUrl}/${postId}/comments`, { withCredentials: true });
  }

  // Get all likes for a post (returns array of users who liked)
  getPostLikes(postId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.postApiUrl}/${postId}/likes`, { withCredentials: true });
  }
}
