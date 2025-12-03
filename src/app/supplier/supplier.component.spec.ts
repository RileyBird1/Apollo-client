import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SupplierComponent } from './supplier.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('SupplierComponent', () => {
  let component: SupplierComponent;
  let fixture: ComponentFixture<SupplierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupplierComponent, RouterTestingModule]
import { SuppliersComponent } from './supplier.component';
import { ActivatedRoute } from '@angular/router';

describe('SuppliersComponent', () => {
  let component: SuppliersComponent;
  let fixture: ComponentFixture<SuppliersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuppliersComponent],
      providers: [{ provide: ActivatedRoute, useValue: {} }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuppliersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
