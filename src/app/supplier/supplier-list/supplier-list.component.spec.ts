import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SupplierListComponent } from './supplier-list.component';
import { SupplierService } from '../supplier.service';
import { of, throwError } from 'rxjs';
import { Supplier } from '../supplier';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('SupplierListComponent', () => {
  let component: SupplierListComponent;
  let fixture: ComponentFixture<SupplierListComponent>;
  let supplierService: SupplierService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupplierListComponent, HttpClientTestingModule, RouterTestingModule],
      providers: [SupplierService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupplierListComponent);
    component = fixture.componentInstance;
    supplierService = TestBed.inject(SupplierService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display supplier records in the DOM', () => {
    const mockSuppliers: Supplier[] = [
      {supplierId: 1, supplierName: 'Supplier 1', contactInformation: 'Contact 1', address: 'Address 1', dateCreated: new Date(), dateModified: new Date()},
      {supplierId: 2, supplierName: 'Supplier 2', contactInformation: 'Contact 2', address: 'Address 2', dateCreated: new Date(), dateModified: new Date()}
    ];
    component.suppliers = mockSuppliers;
    fixture.detectChanges();

    const supplierRows = fixture.debugElement.queryAll(By.css('.supplier-page__table-body .supplier-page__table-row'));
    expect(supplierRows.length).toBeGreaterThan(0);
  });

  it('should handle error when fetching suppliers fails', () => {
    spyOn(supplierService, 'getSuppliers').and.returnValue(throwError('Error fetching suppliers'));
    fixture.detectChanges();
    expect(component.suppliers.length).toBe(0);
  });

  it('should delete a supplier', () => {
    const mockSuppliers: Supplier[] = [
      {supplierId: 1, supplierName: 'Supplier 1', contactInformation: 'Contact 1', address: 'Address 1', dateCreated: new Date(), dateModified: new Date()},
      {supplierId: 2, supplierName: 'Supplier 2', contactInformation: 'Contact 2', address: 'Address 2', dateCreated: new Date(), dateModified: new Date()}
    ];

    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(supplierService, 'deleteSupplier').and.returnValue(of({}));
    component.suppliers = mockSuppliers;

    component.deleteSupplier(1);
    fixture.detectChanges();

    expect(component.suppliers.length).toBe(1);
    expect(component.suppliers[0].supplierId).toBe(2);
  });
});
