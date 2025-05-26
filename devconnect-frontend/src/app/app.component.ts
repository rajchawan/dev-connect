import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // ✅ Add this

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule], // ✅ Add RouterModule to make <router-outlet> work
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'devconnect-frontend';
}
