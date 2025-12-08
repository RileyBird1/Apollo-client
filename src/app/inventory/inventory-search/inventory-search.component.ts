import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-inventory-search',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <h3>Inventory Search</h3>
    <h4>Choose Search Method:</h4>
   <div class ="content-wrapper">
      <div class="child-btn-group">
        <a class="child-btn" routerLink="search/get-by-id" routerLinkActive="active">Search by ID</a>
       
      </div>
      <section class="content-area" style="margin-top: 16px;">
        <router-outlet></router-outlet>
      </section>
   </div>
    
  `,
  styles: `
    h3{
      margin: 20px 12px;
    }
    h4{
      margin-left: 12px;
    }
    .content-wrapper {
      display: flex;
      flex-direction: row;
      min-height: 400px;
      gap: 24px;
      width: 900px;
      margin-bottom: 10rem;
    }
    .child-btn-group {
      display: flex;
      flex-direction: column;
      max-width: 250px;
      padding: 2rem;
      gap: 2rem;
      margin: 12px;
      border-right: 1px solid #ccc;
    }
    .child-btn {
      padding: 12px 24px;
      background-color: #244a8a;
      color: white;
      text-decoration: none;
      text-align: center;
      border-radius: 4px;
    }
    .child-btn.active, .child-btn:hover {
      background-color: #007bff;
    }
    .content-area {
      display: flex;
      justify-content: center;
      flex-grow: 1;
      padding: 16px;
      border-radius: 4px;
      min-height: 200px;
      
    }
  `
})
export class InventorySearchComponent {

}
