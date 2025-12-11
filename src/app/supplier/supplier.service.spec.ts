import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SupplierService } from './supplier.service';
import { Supplier } from './supplier';
import { environment } from '../../environments/environment';

describe("InventoryService", () => {
  let service: SupplierService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SupplierService],
    });
    service = TestBed.inject(SupplierService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it("should retrieve all suppliers", () => {
    const dummySuppliers: Supplier[] = [
      {
        supplierId: 1,
        supplierName: "Supplier 1",
        contactInformation: "123-456-7890",
        address: "ABC Main St",
        dateCreated: new Date(),
        dateModified: new Date(),
      },
      {
        supplierId: 2,
        supplierName: "Supplier 2",
        contactInformation: "234-456-7890",
        address: "DCE Main St",
        dateCreated: new Date(),
        dateModified: new Date(),
      },
    ];

    service.getSuppliers().subscribe((suppliers) => {
      expect(suppliers.length).toBe(2);
      expect(suppliers).toEqual(dummySuppliers);
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/api/supplier`);
    expect(req.request.method).toBe("GET");
    req.flush(dummySuppliers);
  });

  it("should retrieve a single supplier by supplierId", () => {
    const dummySupplier: Supplier = {
      itemId: 1,
      supplierId: 1,
      name: "Item 1",
      description: "Desc 1",
      quantity: 10,
      price: 100,
      dateCreated: new Date(),
      dateModified: new Date(),
      categoryId: 0,
    };

    service.getInventory(1).subscribe((inventory) => {
      expect(inventory).toEqual(dummyInventory);
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/api/inventory/1`);
    expect(req.request.method).toBe("GET");
    req.flush(dummyInventory);
  });
});