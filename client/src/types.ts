interface ResolverResponse {
  __typename: string;
}

export interface Category extends ResolverResponse {
  name: string;
}

export interface ProductImage extends ResolverResponse {
  url: string;
}

export interface Currency extends ResolverResponse {
  label: string;
  symbol: string;
}

export interface Price extends ResolverResponse {
  currency: Currency;
  amount: number;
}

export interface Attribute extends ResolverResponse {
  id: string;
  value: string;
  displayValue: string;
}

export interface AttributeSet extends ResolverResponse {
  id: string;
  name: string;
  type: string;
  items: Attribute[];
}

export interface Product {
  id: string;
  name: string;
  inStock: boolean;
  description: string;
  category: string;
  brand: string;
  images: ProductImage[];
  price: Price;
  attributes: AttributeSet[];
}

export interface CategoriesResponse {
  categories: Category[];
}

export interface ProductsResponse {
  products: Product[];
}

export interface ProductResponse {
  product: Product;
}
