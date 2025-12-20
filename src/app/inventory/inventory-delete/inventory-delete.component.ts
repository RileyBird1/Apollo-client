import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InventoryService } from '../inventory.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { InventoryService } from '../inventory.service';

@Component({
  selector: 'app-inventory-delete',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <br>
    <br>
    <div class="inventory-create-container card">
      <div class="card-header">Delete Inventory Item</div>
      <form [formGroup]="deleteForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="itemId">Item ID</label>
          <input id="itemId" formControlName="itemId" type="number" required />
        </div>
        <button class="btn" type="submit" [disabled]="deleteForm.invalid || loading">Delete</button>
      </form>
      <div *ngIf="responseMessage" class="response-message">{{ responseMessage }}</div>
    </div>
  `,
  styles: []
})
export class InventoryDeleteComponent {
  deleteForm: FormGroup;
  responseMessage = '';
  loading = false;

  constructor(private fb: FormBuilder, private http: HttpClient, private inventoryService: InventoryService) {
    this.deleteForm = this.fb.group({
      itemId: ['', [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit() {
    if (this.deleteForm.invalid) return;
    this.loading = true;
    const itemId = this.deleteForm.value.itemId;
    this.inventoryService.deleteInventory(itemId).subscribe({
      next: (res: any) => {
        this.responseMessage = res.message || 'Item deleted successfully.';
        this.loading = false;
      },
      error: err => {
        this.responseMessage = err.error?.error || err.error?.message || 'Error deleting item.';
        this.loading = false;
      }
    });
  }
}
