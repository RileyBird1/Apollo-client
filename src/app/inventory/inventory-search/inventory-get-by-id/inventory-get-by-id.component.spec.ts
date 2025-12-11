import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InventoryGetByIdComponent } from './inventory-get-by-id.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; 
import { InventoryService } from '../../inventory.service';


describe('InventoryGetByIdComponent', () => {
  let component: InventoryGetByIdComponent;
  let fixture: ComponentFixture<InventoryGetByIdComponent>;
  let mockInventoryService: jasmine.SpyObj<InventoryService>;

  beforeEach(async () => {
    mockInventoryService = jasmine.createSpyObj('InventoryService', ['getInventory']);

    await TestBed.configureTestingModule({
      imports: [InventoryGetByIdComponent, RouterTestingModule, HttpClientTestingModule  ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryGetByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should show error for non-numeric input', () => {
    component.form.controls['itemId'].setValue('abc');
    component.onSearch();

    expect(component.inventory).toBeNull();
    expect(component.errorMessage).toBe('Please enter a valid numeric item ID');
  });

  it('should show error when input is empty', () => {
    component.form.controls['itemId'].setValue('');
    component.onSearch();

    expect(component.inventory).toBeNull();
    expect(component.errorMessage).toBe('Please enter a valid numeric item ID');
  });

  it('should clear inventory when a new invalid search is performed', () => {
  // Set an initial valid inventory
  component.inventory = { 
  itemId: 100, categoryId: 1000, supplierId: 1, name: 'Water Boiler', description: 'Test item', 
    quantity: 10, price: 50, dateCreated: new Date(), dateModified: new Date() 
  };

  // Enter an invalid input
  component.form.controls['itemId'].setValue('abc');
  component.onSearch();

  expect(component.inventory).toBeNull();
  expect(component.errorMessage).toBe('Please enter a valid numeric item ID');
});
  
   
});
