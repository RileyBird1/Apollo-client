import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierGetByIdComponent } from './supplier-get-by-id.component';

describe('SupplierGetByIdComponent', () => {
  let component: SupplierGetByIdComponent;
  let fixture: ComponentFixture<SupplierGetByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupplierGetByIdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupplierGetByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
