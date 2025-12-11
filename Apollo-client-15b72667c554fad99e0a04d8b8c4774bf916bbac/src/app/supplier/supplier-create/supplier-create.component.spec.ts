import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SupplierCreateComponent } from './supplier-create.component';
import { SupplierService } from '../supplier.service';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';

describe('SupplierCreateComponent', () => {
  let component: SupplierCreateComponent;
  let fixture: ComponentFixture<SupplierCreateComponent>;
  let supplierServiceSpy: jasmine.SpyObj<SupplierService>;

  beforeEach(waitForAsync(() => {
    const spy = jasmine.createSpyObj('SupplierService', ['createSupplier']);
    TestBed.configureTestingModule({
      imports: [SupplierCreateComponent, ReactiveFormsModule],
      providers: [{ provide: SupplierService, useValue: spy }]
    }).compileComponents();
    supplierServiceSpy = TestBed.inject(SupplierService) as jasmine.SpyObj<SupplierService>;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show success message on valid supplier creation', () => {
    supplierServiceSpy.createSupplier.and.returnValue(of({ supplierId: 1, supplierName: 'Test', contactInformation: '', address: '123' }));
    component.supplierForm.setValue({ supplierId: 1, supplierName: 'Test', contactInformation: '', address: '123' });
    component.onSubmit();
    expect(component.responseMessage).toContain('successfully');
  });

  it('should not submit if required fields are missing', () => {
    component.supplierForm.setValue({ supplierId: '', supplierName: '', contactInformation: '', address: '' });
    component.onSubmit();
    expect(component.responseMessage).toBe('');
  });

  it('should show error message on API error', () => {
    supplierServiceSpy.createSupplier.and.returnValue(throwError(() => ({ error: { error: 'API error' } })));
    component.supplierForm.setValue({ supplierId: 1, supplierName: 'Test', contactInformation: '', address: '123' });
    component.onSubmit();
    expect(component.responseMessage).toContain('Error: API error');
  });
});
