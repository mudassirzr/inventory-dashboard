export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  quantity: number;
  currency: string;
  disabled?: boolean;
}
export interface ProductResponse {
  name: string;
  category: string;
  value: string;
  quantity: number;
  price: string;
}

export interface ProductState {
  [id: number]: Product;
}

// export interface ProductAction {
//   type: string;
//   payload: Product;
// }
