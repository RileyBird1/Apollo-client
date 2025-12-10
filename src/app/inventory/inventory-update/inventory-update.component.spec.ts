import { TestBed, ComponentFixture } from '@angular/core/testing';
import { InventoryUpdateComponent } from './inventory-update.component';
import { InventoryService } from '../inventory.service';
import { of, throwError } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('InventoryUpdateComponent', () => {
  let component: InventoryUpdateComponent;
  let fixture: ComponentFixture<InventoryUpdateComponent>;
  let mockInventoryService: any;

  beforeEach(async () => {
    mockInventoryService = {
      getInventory: jasmine.createSpy('getInventory'),
      updateInventory: jasmine.createSpy('updateInventory')
    };

    await TestBed.configureTestingModule({
      imports: [
        InventoryUpdateComponent,      
        RouterTestingModule            
      ],
      providers: [
        { provide: InventoryService, useValue: mockInventoryService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(InventoryUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  
  //TEST 1 — show error for invalid itemId in search form
  it('should show an error when itemId is not a number', () => {
    component.searchForm.setValue({ itemId: 'abc' });

    component.onSearch();

    expect(component.errorMessage).toBe('Please enter a valid numeric item ID');
    expect(component.inventory).toBeNull();
  });

  
  // TEST 2 — successfully load inventory item on search
  it('should load inventory data when item is found', () => {
    const mockItem = {
      itemId: 10,
      name: 'Test Item',
      description: 'Desc',
      quantity: 5,
      price: 100,
      categoryId: 1,
      supplierId: 1,
      dateCreated: new Date(),
      dateModified: new Date()
    };

    mockInventoryService.getInventory.and.returnValue(of(mockItem));

    component.searchForm.setValue({ itemId: '10' });
    component.onSearch();

    expect(component.inventory).toEqual(mockItem);
    expect(component.errorMessage).toBe('');
    expect(component.updateForm.value.name).toBe('Test Item');
  });

  
  // TEST 3 — handle update failure gracefully
  it('should show an error message when update fails', () => {
    const mockItem = {
      itemId: 10,
      name: 'Test',
      description: 'Test',
      quantity: 2,
      price: 10,
      categoryId: 1,
      supplierId: 1,
      dateCreated: new Date(),
      dateModified: new Date()
    };

    // Pre-load inventory into component
    component.inventory = mockItem;

    mockInventoryService.updateInventory.and.returnValue(
      throwError(() => new Error('Update failed'))
    );

    component.updateForm.setValue({
      name: 'Updated',
      description: 'Updated',
      quantity: '3',
      price: '50'
    });

    component.onUpdate();

    expect(component.updateError).toBe('Failed to update item.');
    expect(component.updateSuccess).toBe('');
  });

});
