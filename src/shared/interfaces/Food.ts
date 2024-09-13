export interface ModifyItem {
    id:number,
    name:string,
    price:number,
    maxChoices:1,
    availabilityType:string,
    available:true
}


export interface Modify {
    id:number,
    name: string,
    minChoices:number,
    maxChoices:number,
    items: ModifyItem[]
}

export interface Food {
    id: number | null,
    name: string,
    description: string,
    price: number,
    images: [{image: string, id: string}],
    modifiers: Modify[]
}

export interface IOrderItem {
    id: number | null;
    name: string;
    valueTotal: number;
    valueUnique: number;
    observation?: string
    qtd: number
}
