import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
    template: `


    <!-- ===== Content Area ===== -->
    <div class="content">
      <!-- Notifications Box -->
      <div class="card">
        <div class="card-header">
          <span style="font-size:1.3em; vertical-align:middle; margin-right:8px;">&#128276;</span>
          Notifications
        </div>
        <div class="card-row">Low stock!</div>
        <div class="card-row">Incoming shipment</div>
      </div>

      <!-- Quick Actions Box -->
      <div class="card">
        <div class="card-header">
          <span style="font-size:1.3em; vertical-align:middle; margin-right:8px;">&#9881;&#65039;</span>
          Quick Actions
        </div>
        <a class="card-row btn" routerLink="/inventory/create" style="display: block; text-align: left;">Create inventory item</a>
        <a class="card-row btn" routerLink="/supplier/search" style="display: block; text-align: left;">Search suppliers</a>
      </div>
    </div>
    `,
  styles: ``
})
export class HomeComponent {
  serverMessage: string;

  constructor(private http: HttpClient) {
    this.serverMessage = '';

    // Simulate a server request that takes 2 seconds to complete
    setTimeout(() => {
      this.http.get(`${environment.apiBaseUrl}/api`).subscribe({
        next: (res: any) => {
          this.serverMessage = res['message'];
        },
        error: (err) => {
          this.serverMessage = 'Error loading server message';
        }
      });
    }, 2000);
  }
}
