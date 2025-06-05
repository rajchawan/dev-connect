import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-search',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss']
})
export class UserSearchComponent implements OnInit {
  query = '';
  users: any[] = [];
  loading = false;

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.query = params['q'] || '';
      if (this.query) {
        this.searchUsers();
      }
    });
  }

  searchUsers() {
    this.loading = true;
    this.http.get<any[]>(`http://localhost:5000/api/users/search?q=${this.query}`)
      .subscribe({
        next: (data) => {
          this.users = data;
          this.loading = false;
        },
        error: (err) => {
          console.error('Search failed:', err);
          this.loading = false;
        }
      });
  }
}
