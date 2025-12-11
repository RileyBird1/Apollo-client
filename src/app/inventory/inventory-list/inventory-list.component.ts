import { Component } from '@angular/core';
import { InventoryService } from '../inventory.service';
import { Inventory } from '../inventory';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  imports: [RouterLink, CommonModule],
  template: `
    <div class="inventory-page">
      @if(inventories && inventories.length > 0){
        <table class="inventory-page__table">
          <thead class="inventory-page__table-head">
            <tr class="inventory-page__table-row">
              <th class="inventory-page__table-header">Item ID</th>
              <th class="inventory-page__table-header">Name</th>
              <th class="inventory-page__table-header">Description</th>
              <th class="inventory-page__table-header">Category ID</th>
              <th class="inventory-page__table-header">Supplier ID</th>
              <th class="inventory-page__table-header">Quantity</th>
              <th class="inventory-page__table-header">Price</th>
              <th class="inventory-page__table-header">Date Created</th>
              <th class="inventory-page__table-header">Actions</th>
            </tr>
         </thead>
          <tbody class="inventory-page__table-body">
            @for(inventory of inventories; track inventory){
              <tr class="inventory-page__table-row">
                 <td class="inventory-page__table-cell">{{inventory.itemId}}</td>
                 <td class="inventory-page__table-cell">{{inventory.name}}</td>
                 <td class="inventory-page__table-cell">{{inventory.description}}</td>
                 <td class="inventory-page__table-cell">{{inventory.categoryId}}</td>
                 <td class="inventory-page__table-cell">{{inventory.supplierId}}</td>
                 <td class="inventory-page__table-cell">{{inventory.quantity}}</td>
                 <td class="inventory-page__table-cell">{{inventory.price | currency}}</td>
                 <td class="inventory-page__table-cell">{{inventory.dateCreated | date:'mediumDate'}}}</td> 
                 <td class="inventory-page__table-cell">
                  <button type="button" (click)="updateInventory(inventory.itemId)" class="inventory-page__icon-button" type="button"  aria-label="Update Inventory" title="update" >
                    <i class="fas fa-edit"></i>
                  </button>
                  <button (click)="deleteInventory(inventory.itemId)" class="inventory-page__icon-button" type="button" aria-label="Delete inventory item" title="delete">
                    <i class="fas fa-trash-alt"></i>
                  </button>
                 </td>
              </tr>
            }
          </tbody>
        </table>
      } @else {
        <p class="inventory-page__no-inventories">No inventory items found.</p>
      }
    </div>
  `,
  styles: `
    .inventory-page {
      padding: 20px;
      margin: 5rem;
    }
    .inventory-page__table {
      width: 100%;
      border-collapse: collapse; 
    }
    .inventory-page__table-head {
       background: linear-gradient(90deg, #1a2950 0%, #244a8a 100%);
       color: white;
    }
    .inventory-page__table-header, .inventory-page__table-cell {
      border: 1px solid #ddd;
      padding: 18px;
      text-align: center;

    }
    .inventory-page__table-row:nth-child(even) {
      background-color: #f9f9f9;
    }
    .inventory-page__icon-button{
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
    
    .inventory-page__no-inventories {
      font-style: italic;
      color: #777;
    } 
  `
})
export class InventoryListComponent {
  inventories: Inventory[] = [];
  serverMessage: string | null = null;
  serverMessageType: 'success' | 'error' | null = null;

  constructor(private inventoryService: InventoryService, private router: Router) {
    this.inventoryService.getInventories().subscribe({
      next:(inventories: Inventory[]) => {
        this.inventories = inventories;
        console.log(`Inventories: ${JSON.stringify(this.inventories)}`);
      },
      error:(err:any) => {
        console.error(`Error occurred while retrieving inventories: ${err}`);
        this.serverMessage = err.message;
      }
    });
  }
  deleteInventory(itemId: number){
    if(!confirm('Are you sure you want to delete this inventory item?')){
      return;
    }
    this.inventoryService.deleteInventory(itemId).subscribe({
      next: () => {
        console.log(`Inventory with item ID ${itemId} deleted successfully.`);
        this.inventories = this.inventories.filter(inv => inv.itemId !== itemId);
        this.serverMessageType = 'success';
        this.serverMessage = `Inventory item with ID ${itemId} deleted successfully.`;
        this.clearMessageAfterDelay();
      },
      error: (err: any) => {
        console.error(`Error occurred while deleting inventory with ID ${err}`);
        this.serverMessageType = 'error';
        this.serverMessage = `Failed to delete inventory item with ID ${itemId}. Please try again later.`;
        this.clearMessageAfterDelay();
      }
    });
  }
  updateInventory(itemId: number) {
    this.router.navigate(['/inventory/update'], {
      queryParams: { itemId }
    });
  }
  private clearMessageAfterDelay(){
    setTimeout(() => {
      this.serverMessage = null;
      this.serverMessageType = null;
    }, 5000);
  }
}
}
