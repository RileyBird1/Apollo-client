import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InventoryDeleteComponent } from './inventory-delete.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';

describe('InventoryDeleteComponent', () => {
  let component: InventoryDeleteComponent;
  let fixture: ComponentFixture<InventoryDeleteComponent>;


  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventoryDeleteComponent, HttpClientTestingModule, ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(InventoryDeleteComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate form as invalid when empty and valid when filled', () => {
    expect(component.deleteForm.valid).toBeFalse();
    component.deleteForm.setValue({ itemId: 123 });
    expect(component.deleteForm.valid).toBeTrue();
  });

  it('should show success message on successful delete', () => {
    component.deleteForm.setValue({ itemId: 123 });
    component.onSubmit();
    const req = httpMock.expectOne('/api/inventory/123');
    expect(req.request.method).toBe('DELETE');
    req.flush({ message: 'Item deleted' });
    expect(component.responseMessage).toBe('Item deleted');
  });

  it('should show error message on failed delete', () => {
    component.deleteForm.setValue({ itemId: 999 });
    component.onSubmit();
    const req = httpMock.expectOne('/api/inventory/999');
    expect(req.request.method).toBe('DELETE');
    req.flush({ error: 'Not found' }, { status: 404, statusText: 'Not Found' });
    expect(component.responseMessage).toContain('Not found');
  });
});
