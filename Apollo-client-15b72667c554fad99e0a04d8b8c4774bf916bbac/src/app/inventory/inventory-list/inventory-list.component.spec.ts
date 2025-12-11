import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { InventoryListComponent } from './inventory-list.component';
import { InventoryService } from '../inventory.service';
import { of, throwError } from 'rxjs';
import { Inventory } from '../inventory';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('InventoryListComponent', () => {
  let component: InventoryListComponent;
  let fixture: ComponentFixture<InventoryListComponent>;
  let inventoryService: InventoryService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventoryListComponent, HttpClientTestingModule, RouterTestingModule],
      providers: [InventoryService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryListComponent);
    component = fixture.componentInstance;
    inventoryService = TestBed.inject(InventoryService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display records in the DOM', () => {
    const mockInventories: Inventory[] = [
      {itemId: 1, name: 'Item 1', description: 'Desc 1', categoryId: 10, supplierId: 100, quantity: 5, price: 50, dateCreated: new Date(), dateModified: new Date()},
      {itemId: 2, name: 'Item 2', description: 'Desc 2', categoryId: 20, supplierId: 200, quantity: 10, price: 100, dateCreated: new Date(), dateModified: new Date()}
    ];
    component.inventories = mockInventories;
    fixture.detectChanges(); // Trigger change detection

    const inventoryRows = fixture.debugElement.queryAll(By.css('.inventory-page__table-body .inventory-page__table-row'));
    expect(inventoryRows.length).toBeGreaterThan(0);
  });

  it('should handle error when fetching inventories fails', () => {
    spyOn(inventoryService, 'getInventories').and.returnValue(throwError('Error fetching inventories'));
    fixture.detectChanges(); // Trigger the component's constructor
    expect(component.inventories.length).toBe(0);
  });

  it('should delete an inventory item', () => {
    const mockInventories: Inventory[] = [
      {itemId: 1, name: 'Item 1', description: 'Desc 1', categoryId: 10, supplierId: 100, quantity: 5, price: 50, dateCreated: new Date(), dateModified: new Date()},
      {itemId: 2, name: 'Item 2', description: 'Desc 2', categoryId: 20, supplierId: 200, quantity: 10, price: 100, dateCreated: new Date(), dateModified: new Date()}
    ];

    spyOn(window, 'confirm').and.returnValue(true); // Simulate user clicking 'OK' on confirm dialog
    spyOn(inventoryService, 'deleteInventory').and.returnValue(of({}));
    component.inventories = mockInventories;

    component.deleteInventory(1);
    fixture.detectChanges(); // Update the view with the deletion state

    expect(component.inventories.length).toBe(1);
    expect(component.inventories[0].itemId).toBe(2);
  });

});

