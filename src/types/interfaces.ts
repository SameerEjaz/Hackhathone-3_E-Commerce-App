export interface Product {
    quantity: number;
    _id: string;
    title: string;
    description?: string;
    price: number;
    tags: string[];
    dicountPercentage: number;
    isNew?: boolean;
    image: string;
    slug:{
        current: string;
    };
}

export interface CartItemType {
    imageUrl: string;
    length: number;
    image: string;
    title: string;
    price: number;
    _id: string;
    quantity: number;
  }