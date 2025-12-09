import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-inventory-create',
  standalone: true, // Mark this component as standalone
  imports: [ReactiveFormsModule, NgIf], // Import ReactiveFormsModule for formGroup binding
  // Inline template for inventory item creation
  template: `
    <br>
    <br>
    <div class="inventory-create-container card">
      <div class="card-header">Create Inventory Item</div>
      <form [formGroup]="inventoryForm" (ngSubmit)="onSubmit()" novalidate style="padding: 18px 24px;">
        <div class="form-group" style="margin-bottom: 16px;">
          <label for="itemId">Item ID</label>
          <input id="itemId" type="number" formControlName="itemId" class="form-control" style="width: 100%; padding: 8px; border-radius: 6px; border: 1px solid #c7d0e0; margin-top: 4px;" />
        </div>
        <div class="form-group" style="margin-bottom: 16px;">
          <label for="categoryId">Category ID</label>
          <input id="categoryId" type="number" formControlName="categoryId" class="form-control" style="width: 100%; padding: 8px; border-radius: 6px; border: 1px solid #c7d0e0; margin-top: 4px;" />
        </div>
        <div class="form-group" style="margin-bottom: 16px;">
          <label for="supplierId">Supplier ID</label>
          <input id="supplierId" type="number" formControlName="supplierId" class="form-control" style="width: 100%; padding: 8px; border-radius: 6px; border: 1px solid #c7d0e0; margin-top: 4px;" />
        </div>
        <div class="form-group" style="margin-bottom: 16px;">
          <label for="name">Name</label>
          <input id="name" type="text" formControlName="name" class="form-control" style="width: 100%; padding: 8px; border-radius: 6px; border: 1px solid #c7d0e0; margin-top: 4px;" />
        </div>
        <div class="form-group" style="margin-bottom: 16px;">
          <label for="description">Description</label>
          <input id="description" type="text" formControlName="description" class="form-control" style="width: 100%; padding: 8px; border-radius: 6px; border: 1px solid #c7d0e0; margin-top: 4px;" />
        </div>
        <div class="form-group" style="margin-bottom: 16px;">
          <label for="quantity">Quantity</label>
          <input id="quantity" type="number" formControlName="quantity" class="form-control" style="width: 100%; padding: 8px; border-radius: 6px; border: 1px solid #c7d0e0; margin-top: 4px;" />
        </div>
        <div class="form-group" style="margin-bottom: 16px;">
          <label for="price">Price</label>
          <input id="price" type="number" formControlName="price" class="form-control" style="width: 100%; padding: 8px; border-radius: 6px; border: 1px solid #c7d0e0; margin-top: 4px;" />
        </div>
        <button type="submit" class="btn btn-primary" [disabled]="!inventoryForm.valid" style="width: 100%; padding: 10px; border-radius: 6px; background: linear-gradient(90deg, #1a2950 0%, #244a8a 100%); color: #fff; font-weight: 600; border: none; margin-top: 8px;">Create Item</button>
      </form>
      <div *ngIf="responseMessage" class="response-message" style="padding: 12px 24px; color: #2e5aac; font-weight: 500;">
        {{ responseMessage }}
      </div>
    </div>
  `
  // Removed styleUrls to use global stylesheet only
})
export class InventoryCreateComponent {
  // Form group for inventory item creation
  inventoryForm: FormGroup;
  // Track submission status
  submitted = false;
  // Store API response or error
  responseMessage = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    // Initialize the form with all required fields
    this.inventoryForm = this.fb.group({
      itemId: ['', [Validators.required, Validators.min(1)]],
      categoryId: ['', [Validators.required, Validators.min(1)]],
      supplierId: ['', Validators.required],
      name: ['', Validators.required],
      description: [''],
      quantity: ['', [Validators.required, Validators.min(0)]],
      price: ['', [Validators.required, Validators.min(0)]]
    });
  }

  // Handle form submission
  onSubmit() {
    this.submitted = true;
    if (this.inventoryForm.valid) {
      // Send POST request to backend API
      this.http.post('http://localhost:3000/api/inventory', this.inventoryForm.value).subscribe({
        next: (res) => {
          this.responseMessage = 'Inventory item created successfully!';
          this.inventoryForm.reset();
          this.submitted = false;
        },
        error: (err) => {
          this.responseMessage = 'Error: ' + (err.error?.error || 'Could not create item.');
        }
      });
    }
  }
}
