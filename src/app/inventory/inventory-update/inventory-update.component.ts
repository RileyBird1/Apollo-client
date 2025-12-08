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
        <h3>Current Details</h3>
        <p><strong>ID:</strong> {{ inventory.itemId }}</p>
        <p><strong>Name:</strong> {{ inventory.name }}</p>
        <p><strong>Description:</strong> {{ inventory.description }}</p>
        <p><strong>Quantity:</strong> {{ inventory.quantity }}</p>
        <p><strong>Price:</strong> {{ inventory.price }}</p>
        <p><strong>Supplier ID:</strong> {{ inventory.supplierId }}</p>
        <p><strong>Category ID:</strong> {{ inventory.categoryId }}</p>
        <p><strong>Date Created:</strong> {{ inventory.dateCreated }}</p>
        <p><strong>Date Modified:</strong> {{ inventory.dateModified }}</p>

        <hr>

        <h3>Update Item</h3>

        <!-- Update Form -->
        <form [formGroup]="updateForm" (ngSubmit)="onUpdate()">
          <label>Name</label>
          <input formControlName="name" />
          <br>
          <label>Description</label>
          <input formControlName="description" />

          <label>Quantity</label>
          <input type="number" formControlName="quantity" />
          <br>
          <label>Price</label>
          <input type="number" formControlName="price" />

          <button class="btn" type="submit">Update</button>
        </form>

        <div *ngIf="updateSuccess" class="success">{{ updateSuccess }}</div>
        <div *ngIf="updateError" class="error">{{ updateError }}</div>

      </div>
    </div>
  `,
  styles: [`
    .error { color: red; }
    .success { color: green; }
    h3, p { margin-bottom: 15px; padding-left: 2rem; }
    h3 { margin-top: 20px; }
    
  `]
})
export class InventoryUpdateComponent {
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
    }
  });
}

  // NEW: update method
  onUpdate() {
    if (!this.inventory) return;

    const updated: UpdateInventoryDTO = {
    name: this.updateForm.value.name ?? '',
    description: this.updateForm.value.description ?? '',
    quantity: Number(this.updateForm.value.quantity),
    price: Number(this.updateForm.value.price)
  };

    this.inventoryService.updateInventory(this.inventory.itemId, updated).subscribe({
      next: () => {
        this.updateSuccess = 'Item updated successfully!';
        this.updateError = '';
      },
      error: () => {
        this.updateError = 'Failed to update item.';
        this.updateSuccess = '';
      }
    });
  }
}
