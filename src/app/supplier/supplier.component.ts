/**
 * supplier.component.ts
 * Main supplier management component for Apollo IMS client.
 * Handles navigation and layout for supplier features.
 */

import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-suppliers',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  template: `
    <!-- Page Wrapper: supplier management layout -->
    <div class="page-wrapper" style="padding: 32px 24px;">
      <div class="inventory-box">
        <h2 style="margin-bottom: 18px;">Supplier Management</h2>
        <!-- Action Tabs: navigation for supplier features -->
        <nav class="action-tabs" aria-label="Supplier actions">
          <a class="action-tab" routerLink="create" routerLinkActive="active">Create</a>
          <a class="action-tab" routerLink="search" routerLinkActive="active">Search</a>
          <a class="action-tab" routerLink="list" routerLinkActive="active">List</a>
        </nav>
        <!-- Content Area: displays routed supplier views -->
        <section class="content-area">
          <router-outlet></router-outlet>
        </section>
      </div>
    </div>
  `
})
export class SupplierComponent {}
