import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SupplierSearchComponent } from './supplier-search.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; 


describe('SupplierSearchComponent', () => {
  let component: SupplierSearchComponent;
  let fixture: ComponentFixture<SupplierSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupplierSearchComponent, RouterTestingModule, HttpClientTestingModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupplierSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
