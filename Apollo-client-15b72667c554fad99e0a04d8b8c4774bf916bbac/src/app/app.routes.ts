import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

import { InventoryComponent } from './inventory/inventory.component';
import { InventoryCreateComponent } from './inventory/inventory-create/inventory-create.component';
import { InventorySearchComponent } from './inventory/inventory-search/inventory-search.component';
import { InventoryUpdateComponent } from './inventory/inventory-update/inventory-update.component';
import { InventoryDeleteComponent } from './inventory/inventory-delete/inventory-delete.component';
import { InventoryListComponent } from './inventory/inventory-list/inventory-list.component';
import { InventoryGetByIdComponent } from './inventory/inventory-search/inventory-get-by-id/inventory-get-by-id.component';


import { SupplierComponent } from './supplier/supplier.component';
import { SupplierCreateComponent } from './supplier/supplier-create/supplier-create.component';
import { SupplierSearchComponent } from './supplier/supplier-search/supplier-search.component';
import { SupplierUpdateComponent } from './supplier/supplier-update/supplier-update.component';
import { SupplierDeleteComponent } from './supplier/supplier-delete/supplier-delete.component';
import { SupplierListComponent } from './supplier/supplier-list/supplier-list.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'inventory',
    component: InventoryComponent,
    children: [
      { path: 'create', component: InventoryCreateComponent },
      { 
        path: 'search', 
        component: InventorySearchComponent,
        children: [
          {
            path: 'search/get-by-id',
            component: InventoryGetByIdComponent
          }
        ] 
      },
      { path: 'update', component: InventoryUpdateComponent },
      { path: 'delete', component: InventoryDeleteComponent },
      { path: 'list', component: InventoryListComponent },
      { path: '', redirectTo: 'create', pathMatch: 'full' }
    ]
  },
  {
    path: 'supplier',
    component: SupplierComponent,
    children: [
      { path: 'create', component: SupplierCreateComponent },
      { path: 'search', component: SupplierSearchComponent },
      { path: 'update', component: SupplierUpdateComponent },
      { path: 'delete', component: SupplierDeleteComponent },
      { path: 'list', component: SupplierListComponent },
      { path: '', redirectTo: 'create', pathMatch: 'full' }
    ]
  }
];
