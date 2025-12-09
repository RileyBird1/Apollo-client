import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { InventoryService } from './inventory.service';
import { Inventory, UpdateInventoryDTO } from './inventory';
import { environment } from '../../environments/environment';

describe('InventoryService', () => {
  let service: InventoryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [InventoryService]
    });
    service = TestBed.inject(InventoryService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  
  afterEach(() => {
    httpMock.verify();
  });  

  it('should retrieve all inventories', () => {
    const dummyInventories: Inventory[] = [
  { itemId: 1, categoryId: 1, supplierId: 1, name: 'Item 1', description: 'Desc 1', quantity: 10, price: 100, dateCreated: new Date(), dateModified: new Date() },
  { itemId: 2, categoryId: 2, supplierId: 2, name: 'Item 2', description: 'Desc 2', quantity: 20, price: 200, dateCreated: new Date(), dateModified: new Date() }
    ];
    
    service.getInventories().subscribe(inventories => {
      expect(inventories.length).toBe(2);
      expect(inventories).toEqual(dummyInventories);
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/api/inventory`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyInventories);

  })

  it('should retrieve a single inventory by itemId', () => {
    const dummyInventory: Inventory = {
      itemId: 1, supplierId: 1, name: 'Item 1', description: 'Desc 1', quantity: 10, price: 100, dateCreated: new Date(), dateModified: new Date(),
      categoryId: 0
    };
    
    service.getInventory(1).subscribe(inventory => {
      expect(inventory).toEqual(dummyInventory);
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/api/inventory/1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyInventory);

  });

  it('should add a new inventory', () => {
<<<<<<< HEAD
    const newInventory: Inventory = {
      itemId: 3, supplierId: 3, name: 'Item 3', description: 'Desc 3', quantity: 30, price: 300, dateCreated: new Date(), dateModified: new Date(),
      categoryId: 0
    };
=======
    const newInventory: Inventory = { itemId: 3, supplierId: 3, name: 'Item 3', description: 'Desc 3', quantity: 30, price: 300, dateCreated: new Date(), dateModified: new Date() };
>>>>>>> 7f958d9d184ceba436c83f691c422472f1d008ef
    
    service.addInventory(newInventory).subscribe(inventory => {
      expect(inventory).toEqual(newInventory);
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/api/inventory`);
    expect(req.request.method).toBe('POST');
    req.flush(newInventory);

  });

  it('should update an existing inventory', () => {

    const updateInventoryDTO: UpdateInventoryDTO = { name: 'Updated Item', description: 'Updated Desc', quantity: 15, price: 150 };
<<<<<<< HEAD
    const updatedInventory: Inventory = {
      itemId: 1, supplierId: 1, name: 'Updated Item', description: 'Updated Desc', quantity: 15, price: 150, dateCreated: new Date(), dateModified: new Date(),
      categoryId: 0
    };
=======
    const updatedInventory: Inventory = { itemId: 1, supplierId: 1, name: 'Updated Item', description: 'Updated Desc', quantity: 15, price: 150, dateCreated: new Date(), dateModified: new Date() };
>>>>>>> 7f958d9d184ceba436c83f691c422472f1d008ef
    
    service.updateInventory(1, updatedInventory).subscribe(inventory => {
      expect(inventory).toEqual(updatedInventory);
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/api/inventory/1`);
    expect(req.request.method).toBe('PATCH');
    req.flush(updatedInventory);

  });

  it('should delete an inventory by itemId', () => {
    service.deleteInventory(1).subscribe(response => {
        expect(response).toEqual({});
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/api/inventory/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});