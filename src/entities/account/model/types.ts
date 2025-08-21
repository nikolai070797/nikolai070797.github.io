export enum UserType {
  Standard = 'Standard',
  Premium = 'Premium',
  Gold = 'Gold',
  Free = 'Free',
}

export enum ProductType {
  Car = 'Car',
  Toy = 'Toy',
  Food = 'Food',
}

export interface User {
  id: string;
  type: UserType;
}

export interface UserDiscount {
  userType: UserType;
  discount: number;
}

export interface ProductDiscount {
  userType: UserType;
  productType: ProductType;
  discount: number;
}
