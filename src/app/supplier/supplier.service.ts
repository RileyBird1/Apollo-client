import { Supplier } from './supplier';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SupplierService {
    constructor(private http: HttpClient) { }

    getSuppliers(){
        return this.http.get<Supplier[]>(`${environment.apiBaseUrl}/api/supplier`);
    }
    getSupplier(itemId: number){
        return this.http.get<Supplier>(`${environment.apiBaseUrl}/api/supplier/${itemId}`);
    }
    addSupplier(supplier: Supplier){
        return this.http.post<Supplier>(`${environment.apiBaseUrl}/api/supplier`, supplier);
    }
    updateSupplier(itemId: number, supplier: Supplier){
        return this.http.patch<Supplier>(`${environment.apiBaseUrl}/api/supplier/${itemId}`, supplier);
    }
    deleteSupplier(itemId: number){
        return this.http.delete(`${environment.apiBaseUrl}/api/supplier/${itemId}`);
    }
}
