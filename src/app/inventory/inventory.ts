export interface Inventory {
    itemId: number;
    supplierId: number;
    name: string;
    description: string;
    quantity: number;
    price: number;
    dateCreated: Date;
    dateModified: Date;
}

export type UpdateInventoryDTO = Omit<Inventory, 'itemId' | 'supplierId' | 'dateCreated' | 'dateModified'>;