import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Optional: define Post interface for type safety
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
}

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'http://localhost:5000/api/posts';

  constructor(private http: HttpClient) {}

  /**
   * Fetch all posts from the backend.
   * Automatically includes credentials (cookies) in the request.
   * @param params - Optional query parameters like page, limit, search
   */
  getAllPosts(params?: any): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl, {
      withCredentials: true,
      params
    });
  }

  /**
   * Create a new post.
   * Includes user session via cookies.
   * @param data - Object with content property
   */
  createPost(data: { content: string }): Observable<Post> {
    return this.http.post<Post>(this.apiUrl, data, { withCredentials: true });
  }

  /**
   * Like a post by its ID.
   * @param postId - ID of the post
   */
  likePost(postId: string): Observable<Post> {
    return this.http.put<Post>(`${this.apiUrl}/${postId}/like`, {}, { withCredentials: true });
  }
}
