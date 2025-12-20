import { Inventory, UpdateInventoryDTO} from './inventory';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
    providedIn: 'root'
})
export class InventoryService {
    constructor(private http: HttpClient) { }

    getInventories(){
        return this.http.get<Inventory[]>(`${environment.apiBaseUrl}/api/inventory`);
    }
    getInventory(itemId: number){
        return this.http.get<Inventory>(`${environment.apiBaseUrl}/api/inventory/${itemId}`);
    }
    addInventory(inventory: Inventory){
        return this.http.post<Inventory>(`${environment.apiBaseUrl}/api/inventory`, inventory);
    }
    updateInventory(itemId: number, inventory: UpdateInventoryDTO){
        return this.http.patch<Inventory>(`${environment.apiBaseUrl}/api/inventory/${itemId}`, inventory);
    }
    deleteInventory(itemId: number){
        return this.http.delete(`${environment.apiBaseUrl}/api/inventory/${itemId}`);
    }
}

