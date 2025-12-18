/**
 * supplier-list.component.ts
 * Component for listing suppliers in Apollo IMS client.
 * Displays supplier list (to be implemented).
 */

import { Component } from '@angular/core';
import { SupplierService } from '../supplier.service';
import { Supplier } from '../supplier';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-supplier-list',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <div class="supplier-page">
      @if(suppliers && suppliers.length > 0){
        <table class="supplier-page__table">
          <thead class="supplier-page__table-head">
            <tr class="supplier-page__table-row">
              <th class="supplier-page__table-header">Supplier ID</th>
              <th class="supplier-page__table-header">Name</th>
              <th class="supplier-page__table-header">Contact Information</th>
              <th class="supplier-page__table-header">Address</th>
              <th class="supplier-page__table-header">Date Created</th>
              
            </tr>
         </thead>
          <tbody class="supplier-page__table-body">
            @for(supplier of suppliers; track supplier){
              <tr class="supplier-page__table-row">
                 <td class="supplier-page__table-cell">{{supplier.supplierId}}</td>
                 <td class="supplier-page__table-cell">{{supplier.supplierName}}</td>
                 <td class="supplier-page__table-cell">{{supplier.contactInformation}}</td>
                 <td class="supplier-page__table-cell">{{supplier.address}}</td>
                 <td class="supplier-page__table-cell">{{supplier.dateCreated | date:'mediumDate'}}</td> 
              
              </tr>
            }
          </tbody>
        </table>
      } @else {
        <p class="supplier-page__no-suppliers">No suppliers found.</p>
      }
    </div>
  `,
  styles: `
    .supplier-page {
      padding: 20px;
      margin: 3rem 0;
    }
    .supplier-page__table {
      width: 100%;
      border-collapse: collapse; 
    }
    .supplier-page__table-head {
       background: linear-gradient(90deg, #1a2950 0%, #244a8a 100%);
       color: white;
    }
    .supplier-page__table-header, .supplier-page__table-cell {
      border: 1px solid #ddd;
      padding: 18px;
      text-align: center;
    }
    .supplier-page__table-row:nth-child(even) {
      background-color: #f9f9f9;
    }
    .supplier-page__icon-button{
      margin: 15px;
      background: none;
      border: none;
      cursor: pointer;
    }
    .fa-trash-alt{
      color: red;
      font-size: 18px;
    }
    .fa-edit{
       color: #007bff;
      font-size: 18px;
    }
    .supplier-page__no-suppliers {
      font-style: italic;
      color: #777;
    } 
  `
})
export class SupplierListComponent {
  suppliers: Supplier[] = [];
  serverMessage: string | null = null;
  serverMessageType: 'success' | 'error' | null = null;

  constructor(private supplierService: SupplierService, private router: Router) {
    this.supplierService.getSuppliers().subscribe({
      next:(suppliers: Supplier[]) => {
        this.suppliers = suppliers;
        console.log(`Suppliers: ${JSON.stringify(this.suppliers)}`);
      },
      error:(err:any) => {
        console.error(`Error occurred while retrieving suppliers: ${err}`);
        this.serverMessage = err.message;
      }
    });
  }

  deleteSupplier(supplierId: number){
    if(!confirm('Are you sure you want to delete this supplier?')){
      return;
    }
    this.supplierService.deleteSupplier(supplierId).subscribe({
      next: () => {
        console.log(`Supplier with ID ${supplierId} deleted successfully.`);
        this.suppliers = this.suppliers.filter(sup => sup.supplierId !== supplierId);
        this.serverMessageType = 'success';
        this.serverMessage = `Supplier with ID ${supplierId} deleted successfully.`;
        this.clearMessageAfterDelay();
      },
      error: (err: any) => {
        console.error(`Error occurred while deleting supplier with ID ${err}`);
        this.serverMessageType = 'error';
        this.serverMessage = `Failed to delete supplier with ID ${supplierId}. Please try again later.`;
        this.clearMessageAfterDelay();
      }
    });
  }

  updateSupplier(supplierId: number) {
    this.router.navigate(['/supplier/update'], {
      queryParams: { supplierId }
    });
  }

  private clearMessageAfterDelay(){
    setTimeout(() => {
      this.serverMessage = null;
      this.serverMessageType = null;
    }, 5000);
  }
}
