import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InventorySearchComponent } from './inventory-search.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; 

describe('InventorySearchComponent', () => {
  let component: InventorySearchComponent;
  let fixture: ComponentFixture<InventorySearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventorySearchComponent, RouterTestingModule, HttpClientTestingModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventorySearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
