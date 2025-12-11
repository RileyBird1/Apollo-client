import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { InventoryService } from '../../inventory.service';
import { CommonModule } from '@angular/common';
import { Inventory } from '../../inventory';

@Component({
  selector: 'app-inventory-get-by-id',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template: `
    <div class=" inventory-create-container card">
      
      <div class="card-header">Search an inventory item </div>
      <form [formGroup]="form" (ngSubmit)="onSearch()">
        <label for="itemId">Item ID</label>
        <input id="itemId" formControlName="itemId" placeholder="Enter item ID" />

        <button class= "btn" type="submit">Search</button>
      </form>

      <div *ngIf="errorMessage" class="error">
        {{ errorMessage }}
      </div>

      <div *ngIf="inventory" class="result-card">
        <h3>Inventory Details</h3>
        <p><strong>ID:</strong> {{ inventory.itemId }}</p>
        <p><strong>Name:</strong> {{ inventory.name }}</p>
        <p><strong>Description:</strong> {{ inventory.description }}</p>
        <p><strong>Quantity:</strong> {{ inventory.quantity }}</p>
        <p><strong>Price:</strong> {{ inventory.price }}</p>
        <p><strong>Supplier ID:</strong> {{ inventory.supplierId }}</p>
        <p><strong>Category ID:</strong> {{ inventory.categoryId }}</p>
        <p><strong>Date Created:</strong> {{ inventory.dateCreated }}</p>
        <p><strong>Date Modified:</strong> {{ inventory.dateModified }}</p>
      </div>
    </div>
  `,
  styles: [`
    .container { max-width: 500px; margin: 0 auto; padding: 20px; }
    form { display: flex; flex-direction: column; gap: 12px; margin-top: 20px;}
    input { padding: 8px; border: 1px solid #ccc; border-radius: 4px; }
    button { background: #1976d2; color: white; padding: 10px; border-radius: 4px; cursor: pointer; }
    .error { color: red; margin-top: 10px; }
    .result-card { padding: 15px; border-radius: 4px; margin-top: 20px; }
    h3{ margin-bottom: 15px; }
    p{ padding-bottom: 8px; }
  `]
})
export class InventoryGetByIdComponent {
  form = this.fb.group({
    itemId: ['']
  });

  inventory: Inventory | null = null;
  errorMessage = '';

  constructor(private fb: FormBuilder, private inventoryService: InventoryService) {}

  onSearch() {
  const rawValue = this.form.get('itemId')?.value;

  if (!rawValue || isNaN(Number(rawValue))) {
    this.errorMessage = 'Please enter a valid numeric item ID';
    this.inventory = null;
    return;
  }

  const itemId = Number(rawValue);

  this.inventoryService.getInventory(itemId).subscribe({
    next: (data) => {
      this.inventory = data;
      this.errorMessage = '';
    },
    error: () => {
      this.inventory = null;
      this.errorMessage = 'Inventory item not found';
    }
  });
}

}
