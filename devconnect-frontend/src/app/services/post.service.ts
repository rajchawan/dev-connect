// src/app/services/post.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'http://localhost:5000/api/posts';

  constructor(private http: HttpClient) {}

  /**
   * Fetch all posts from the backend.
   * Automatically includes credentials (cookies) in the request.
   */
  getAllPosts(): Observable<any> {
    return this.http.get(this.apiUrl, { withCredentials: true });
  }

  /**
   * Create a new post.
   * Includes user session via cookies.
   * @param content - Post content
   */
  createPost(content: string): Observable<any> {
    return this.http.post(this.apiUrl, { content }, { withCredentials: true });
  }

  /**
   * Like a post by its ID.
   * @param postId - ID of the post
   */
  likePost(postId: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${postId}/like`, {}, { withCredentials: true });
  }
}
