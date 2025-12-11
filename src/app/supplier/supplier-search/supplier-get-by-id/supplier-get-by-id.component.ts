import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SupplierService } from '../../supplier.service';
import { CommonModule } from '@angular/common';
import { Supplier } from '../../supplier';

@Component({
  selector: 'app-inventory-get-by-id',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template: `
    <div class=" inventory-create-container card">
      
      <div class="card-header">Search a supplier </div>
      <form [formGroup]="form" (ngSubmit)="onSearch()">
        <label for="supplierId">Supplier ID</label>
        <input id="supplierId" formControlName="supplierId" placeholder="Enter supplier ID" />

        <button class= "btn" type="submit">Search</button>
      </form>

      <div *ngIf="errorMessage" class="error">
        {{ errorMessage }}
      </div>

      <div *ngIf="supplier" class="result-card">
        <h3>Supplier Details</h3>
        <p><strong>ID:</strong> {{ supplier.supplierId }}</p>
        <p><strong>Name:</strong> {{ supplier.supplierName }}</p>
        <p><strong>Contact:</strong> {{ supplier.contactInformation }}</p>
        <p><strong>Address:</strong> {{ supplier.address }}</p>
        <p><strong>Date Created:</strong> {{ supplier.dateCreated }}</p>
        <p><strong>Date Modified:</strong> {{ supplier.dateModified }}</p>
      </div>
    </div>
  `,
  styles: [`
    .error { color: red; margin: 2rem; text-align: center; }
    .result-card { padding: 15px; border-radius: 4px; margin-top: 20px; }
    h3{ margin-bottom: 15px; }
    p{ padding-bottom: 8px; }
  `]
})
export class SupplierGetByIdComponent {
  form = this.fb.group({
      supplierId: ['']
    });
  
    supplier: Supplier | null = null;
    errorMessage = '';
  
    constructor(private fb: FormBuilder, private supplierService: SupplierService) {}
  
    onSearch() {
    const rawValue = this.form.get('supplierId')?.value;
  
    if (!rawValue || isNaN(Number(rawValue))) {
      this.errorMessage = 'Please enter a valid numeric supplier ID';
      this.supplier = null;
      return;
    }
  
    const supplierId = Number(rawValue);
  
    this.supplierService.getSupplier(supplierId).subscribe({
      next: (data) => {
        this.supplier = data;
        this.errorMessage = '';
      },
      error: () => {
        this.supplier = null;
        this.errorMessage = 'Supplier not found';
      }
    });
  }
  
}
