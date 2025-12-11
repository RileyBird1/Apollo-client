import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SupplierGetByIdComponent } from './supplier-get-by-id.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; 
import { SupplierService } from '../../supplier.service';


describe("SupplierGetByIdComponent", () => {
  let component: SupplierGetByIdComponent;
  let fixture: ComponentFixture<SupplierGetByIdComponent>;
  let mockSupplierService: jasmine.SpyObj<SupplierService>;

  beforeEach(async () => {
    mockSupplierService = jasmine.createSpyObj('SupplierService', ['getSupplier']);

    await TestBed.configureTestingModule({
      imports: [
        SupplierGetByIdComponent,
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      
    }).compileComponents();

    fixture = TestBed.createComponent(SupplierGetByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  // TEST 1 
  it("should show error for non-numeric input", () => {
    component.form.controls["supplierId"].setValue("abc");
    component.onSearch();

    expect(component.supplier).toBeNull();
    expect(component.errorMessage).toBe(
      "Please enter a valid numeric supplier ID"
    );
  });

  // TEST 2
  it("should show error when input is empty", () => {
    component.form.controls["supplierId"].setValue("");
    component.onSearch();

    expect(component.supplier).toBeNull();
    expect(component.errorMessage).toBe("Please enter a valid numeric supplier ID");
  });

  // TEST 3
  it("should clear supplier when a new invalid search is performed", () => {
    // Set an initial valid supplier
    component.supplier = {
        supplierId: 1,
        supplierName: "Supplier 1",
        contactInformation: "123-456-7890",
        address: "ABC Main St",
        dateCreated: new Date(),
        dateModified: new Date(),
    };

    // Enter an invalid input
    component.form.controls["supplierId"].setValue("abc");
    component.onSearch();

    expect(component.supplier).toBeNull();
    expect(component.errorMessage).toBe("Please enter a valid numeric supplier ID");
  });
});
