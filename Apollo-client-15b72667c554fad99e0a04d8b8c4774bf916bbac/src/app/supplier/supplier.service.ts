import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

export interface Supplier {
  supplierId: number;
  supplierName: string;
  contactInformation: string;
  address: string;
}

@Injectable({ providedIn: 'root' })
export class SupplierService {
  constructor(private http: HttpClient) {}

  createSupplier(supplier: Supplier) {
    return this.http.post<Supplier>(`${environment.apiBaseUrl}/api/supplier`, supplier);
  }
}
