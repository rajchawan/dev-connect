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
  image?: string;  // <-- Add image property here if needed
}

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'http://localhost:5000/api/posts';

  constructor(private http: HttpClient) {}

  getAllPosts(params?: any): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl, {
      withCredentials: true,
      params
    });
  }

  // Updated createPost to accept FormData for image upload
  createPost(data: FormData): Observable<Post> {
    return this.http.post<Post>(this.apiUrl, data, { withCredentials: true });
  }

  likePost(postId: string): Observable<Post> {
    return this.http.put<Post>(`${this.apiUrl}/${postId}/like`, {}, { withCredentials: true });
  }
}
