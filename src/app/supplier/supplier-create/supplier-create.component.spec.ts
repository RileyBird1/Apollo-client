
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SupplierCreateComponent } from './supplier-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';

describe('SupplierCreateComponent', () => {
  let component: SupplierCreateComponent;
  let fixture: ComponentFixture<SupplierCreateComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupplierCreateComponent, ReactiveFormsModule, HttpClientTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(SupplierCreateComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should have an invalid form when required fields are empty', () => {
    expect(component.supplierForm.valid).toBeFalse();
  });

  it('should create supplier and show success message', () => {
    component.supplierForm.setValue({
      supplierId: 1,
      name: 'Test Supplier',
      contact: '123456789',
      address: '123 Main St'
    });
    component.onSubmit();
    const req = httpMock.expectOne('http://localhost:3000/api/supplier');
    expect(req.request.method).toBe('POST');
    req.flush({});
    expect(component.responseMessage).toContain('successfully');
  });

  it('should show error message if API fails', () => {
    component.supplierForm.setValue({
      supplierId: 1,
      name: 'Test Supplier',
      contact: '123456789',
      address: '123 Main St'
    });
    component.onSubmit();
    const req = httpMock.expectOne('http://localhost:3000/api/supplier');
    req.flush({ error: 'Failed to create' }, { status: 400, statusText: 'Bad Request' });
    expect(component.responseMessage).toContain('Error');
  });
});
