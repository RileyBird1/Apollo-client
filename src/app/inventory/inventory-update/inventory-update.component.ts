import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InventoryService } from '../inventory.service';
import { CommonModule } from '@angular/common';
import { Inventory, UpdateInventoryDTO } from '../inventory';

@Component({
  selector: 'app-inventory-update',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template: `
    <br>
    <br>
    <div class=" inventory-create-container card">
      
      <div class="card-header">Search an inventory item to update</div>
      <form [formGroup]="searchForm" (ngSubmit)="onSearch()">
        <label for="itemId">Item ID</label>
        <input id="itemId" formControlName="itemId" placeholder="Enter item ID" />

        <button class= "btn" type="submit">Search</button>
      </form>

      <div *ngIf="errorMessage" class="error">
        {{ errorMessage }}
      </div>

      <div *ngIf="inventory" class="result-card">
        <h3>Current Item Details</h3>
        <p><strong>ID:</strong> {{ inventory.itemId }}</p>
        <p><strong>Name:</strong> {{ inventory.name }}</p>
        <p><strong>Description:</strong> {{ inventory.description }}</p>
        <p><strong>Quantity:</strong> {{ inventory.quantity }}</p>
        <p><strong>Price:</strong> {{ inventory.price }}</p>
        
        

        <!-- HIDE FORM WHEN UPDATE IS SUCCESSFUL -->
        

        <form *ngIf="showUpdateForm" [formGroup]="updateForm" (ngSubmit)="onUpdate()">
        <hr>
          
        <h3>Update Item Details </h3>

          <label>Name</label>
          <input formControlName="name" />
          <br>

          <label>Description</label>
          <input formControlName="description" />
          <br>

          <label>Quantity</label>
          <input type="number" formControlName="quantity" />
          <br>

          <label>Price</label>
          <input type="number" formControlName="price" />

          <button class="btn" type="submit">Update</button>
        </form>

        <!-- Show message after form disappears -->
        <div *ngIf="!showUpdateForm" class="success">
          {{ updateSuccess }}
        </div>

        <div *ngIf="updateError" class="error">{{ updateError }}</div>

      </div>
    </div>
  `,
  styles: [`
    .error { color: red; text-align: center; font-size: 1.2rem; margin: 2rem 0; }
    .success { color:#244a8a; text-align: center; font-size: 1.2rem; margin: 2rem 0; }
    p { margin-bottom: 15px; padding-left: 2rem; }
    h3 { text-align: center; margin: 2rem 0; }
    
  `]
})
export class InventoryUpdateComponent {
  // Control visibility of update form
  showUpdateForm = true;

  // search form
  searchForm = this.fb.group({
    itemId: ['', Validators.required]
  });

  // update form
  updateForm = this.fb.group({
    name: [''],
    description: [''],
    quantity: [''],
    price: ['']
  });
  

  inventory: Inventory | null = null;
  errorMessage = '';
  
  // update result messages
  updateSuccess = '';
  updateError = '';

  constructor(private fb: FormBuilder, private inventoryService: InventoryService) {}

  onSearch() {
  const rawValue = this.searchForm.get('itemId')?.value;

  if (!rawValue || isNaN(Number(rawValue))) {
    this.errorMessage = 'Please enter a valid numeric item ID';
    this.inventory = null;
    return;
  }

  const itemId = Number(rawValue);

  this.inventoryService.getInventory(itemId).subscribe({
    next: (data: Inventory) => {
      this.inventory = data;
      this.errorMessage = '';
      this.updateSuccess = '';
      this.updateError = '';

      this.updateForm.patchValue({
          name: data.name,
          description: data.description,
          quantity: data.quantity.toString(),
          price: data.price.toString(),
        });
    },
    error: () => {
      this.inventory = null;
      this.errorMessage = 'Inventory item not found';
      // Hide error after 5 seconds if you want
        setTimeout(() => {
          this.errorMessage = '';
        }, 3000);
    }
  });
}

  // NEW: update method
  onUpdate() {
    if (!this.inventory) return;

    const updated: UpdateInventoryDTO = {
      name: this.updateForm.controls['name'].value ?? '',
      description: this.updateForm.controls['description'].value ?? '',
      quantity: Number(this.updateForm.controls['quantity'].value),
      price: Number(this.updateForm.controls['price'].value)
    };
    

    this.inventoryService.updateInventory(this.inventory.itemId, updated).subscribe({
      next: () => {
        this.updateSuccess = 'Item updated successfully 🎉';
        this.updateError = '';
        this.showUpdateForm = false; // Hide the form after successful update

        // Refresh item from backend automatically after 1 second
        setTimeout(() => {
          this.onSearch();
        }, 1000);
      },
      error: () => {
        this.updateError = 'Failed to update item.';
        this.updateSuccess = '';

        // Hide error after 5 seconds if you want
        setTimeout(() => {
          this.updateError = '';
        }, 1000);
      }
    });
  }
}
