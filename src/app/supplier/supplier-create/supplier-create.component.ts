/**
 * supplier-create.component.ts
 * Component for creating new suppliers in Apollo IMS client.
 * Displays supplier creation form and handles submission.
 */

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-supplier-create',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  template: `
    <br>
    <br>
    <div class="inventory-create-container card">
      <div class="card-header">Create Supplier</div>
      <form [formGroup]="supplierForm" (ngSubmit)="onSubmit()" novalidate class="form-content">
        <div class="form-group">
          <label for="supplierId">Supplier ID</label>
          <input id="supplierId" type="number" formControlName="supplierId" class="form-control" />
        </div>
        <div class="form-group">
          <label for="supplierName">Name</label>
          <input id="supplierName" type="text" formControlName="supplierName" class="form-control" />
        </div>
        <div class="form-group">
          <label for="contactInformation">Contact</label>
          <input id="contactInformation" type="text" formControlName="contactInformation" class="form-control" />
        </div>
        <div class="form-group">
          <label for="address">Address</label>
          <input id="address" type="text" formControlName="address" class="form-control" />
        </div>
        <button type="submit" class="btn btn-primary" [disabled]="!supplierForm.valid">Create Supplier</button>
      </form>
      <div *ngIf="responseMessage" class="response-message">
        {{ responseMessage }}
      </div>
    </div>
  `
})
export class SupplierCreateComponent {
  supplierForm: FormGroup;
  submitted = false;
  responseMessage = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.supplierForm = this.fb.group({
      supplierId: ['', [Validators.required, Validators.min(1)]],
      supplierName: ['', Validators.required],
      contactInformation: [''],
      address: ['']
    });
  }

  /**
   * onSubmit
   * Handles form submission for supplier creation.
   * Sends POST request to server with supplier data.
   * Displays success or error message based on response.
   */
  onSubmit() {
    this.submitted = true;
    if (this.supplierForm.valid) {
      this.http.post('http://localhost:3000/api/supplier', this.supplierForm.value).subscribe({
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
