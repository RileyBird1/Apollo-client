import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { SupplierService } from '../supplier.service';

@Component({
  selector: 'app-supplier-create',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  template: `
    <br>
    <br>
    <div class="inventory-create-container card">
      <div class="card-header">Create Supplier</div>
      <form [formGroup]="supplierForm" (ngSubmit)="onSubmit()" novalidate style="padding: 18px 24px;">
        <div class="form-group" style="margin-bottom: 16px;">
          <label for="supplierId">Supplier ID</label>
          <input id="supplierId" type="number" formControlName="supplierId" class="form-control" style="width: 100%; padding: 8px; border-radius: 6px; border: 1px solid #c7d0e0; margin-top: 4px;" />
        </div>
        <div class="form-group" style="margin-bottom: 16px;">
          <label for="supplierName">Supplier Name</label>
          <input id="supplierName" type="text" formControlName="supplierName" class="form-control" style="width: 100%; padding: 8px; border-radius: 6px; border: 1px solid #c7d0e0; margin-top: 4px;" />
        </div>
        <div class="form-group" style="margin-bottom: 16px;">
          <label for="contactInformation">Contact Information</label>
          <input id="contactInformation" type="text" formControlName="contactInformation" class="form-control" style="width: 100%; padding: 8px; border-radius: 6px; border: 1px solid #c7d0e0; margin-top: 4px;" />
        </div>
        <div class="form-group" style="margin-bottom: 16px;">
          <label for="address">Address</label>
          <input id="address" type="text" formControlName="address" class="form-control" style="width: 100%; padding: 8px; border-radius: 6px; border: 1px solid #c7d0e0; margin-top: 4px;" />
        </div>
        <button type="submit" class="btn btn-primary" [disabled]="!supplierForm.valid" style="width: 100%; padding: 10px; border-radius: 6px; background: linear-gradient(90deg, #1a2950 0%, #244a8a 100%); color: #fff; font-weight: 600; border: none; margin-top: 8px;">Create Supplier</button>
      </form>
      <div *ngIf="responseMessage" class="response-message" style="padding: 12px 24px; color: #2e5aac; font-weight: 500;">
        {{ responseMessage }}
      </div>
    </div>
  `
})
export class SupplierCreateComponent {
  supplierForm: FormGroup;
  responseMessage = '';
  submitted = false;

  constructor(private fb: FormBuilder, private supplierService: SupplierService) {
    this.supplierForm = this.fb.group({
      supplierId: ['', [Validators.required, Validators.min(1)]],
      supplierName: ['', Validators.required],
      contactInformation: [''],
      address: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.supplierForm.valid) {
      this.supplierService.createSupplier(this.supplierForm.value).subscribe({
        next: (res) => {
          this.responseMessage = 'Supplier created successfully!';
          this.supplierForm.reset();
          this.submitted = false;
        },
        error: (err) => {
          this.responseMessage = 'Error: ' + (err.error?.error || 'Could not create supplier.');
        }
      });
    }
  }
}
