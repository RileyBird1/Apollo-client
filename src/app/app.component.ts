import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  template: `
    <!-- ===== Top Bar ===== -->
    <div class="topbar">
      <a class="logo" routerLink="/">Apollo IMS</a>
      <div class="tabs">
        <a class="tab" routerLink="/inventory" routerLinkActive="active">Inventory</a>
        <a class="tab" routerLink="/supplier" routerLinkActive="active">Suppliers</a>
      </div>
    </div>

    <!-- ===== Routed Content Area ===== -->
    <router-outlet></router-outlet>

    <!-- ===== Footer ===== -->
    <div class="footer">
      <p>&copy; 2025 Apollo IMS. All rights reserved.</p>
    </div>
  `,
  styles: [
    ``
  ]
})
export class AppComponent {
  title = 'ims-client';
}
