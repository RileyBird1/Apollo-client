import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InventoryCreateComponent } from './inventory-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';

describe('InventoryCreateComponent', () => {
  let component: InventoryCreateComponent;
  let fixture: ComponentFixture<InventoryCreateComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventoryCreateComponent, ReactiveFormsModule, HttpClientTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(InventoryCreateComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  // Test 1: Form should be invalid if required fields are missing
  it('should have an invalid form when required fields are empty', () => {
    expect(component.inventoryForm.valid).toBeFalse();
  });

  // Test 2: Should send POST request and show success message
  it('should create inventory item and show success message', () => {
    component.inventoryForm.setValue({
      itemId: 1,
      categoryId: 1,
      supplierId: 1,
      name: 'Test Item',
      description: 'Test Description',
      quantity: 10,
      price: 99.99
    });
    component.onSubmit();
    const req = httpMock.expectOne('http://localhost:3000/api/inventory');
    expect(req.request.method).toBe('POST');
    req.flush({});
    expect(component.responseMessage).toContain('successfully');
  });

  // Test 3: Should show error message on failed creation
  it('should show error message if API fails', () => {
    component.inventoryForm.setValue({
      itemId: 1,
      categoryId: 1,
      supplierId: 1,
      name: 'Test Item',
      description: 'Test Description',
      quantity: 10,
      price: 99.99
    });
    component.onSubmit();
    const req = httpMock.expectOne('http://localhost:3000/api/inventory');
    req.flush({ error: 'Failed to create' }, { status: 400, statusText: 'Bad Request' });
    expect(component.responseMessage).toContain('Error');
  });
});
