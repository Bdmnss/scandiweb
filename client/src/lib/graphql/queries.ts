import { gql } from "@apollo/client";

export const ProductFields = gql`
  fragment ProductFields on Product {
    id
    name
    inStock
    description
    category
    brand
    images {
      url
    }
    prices {
      amount
      currency {
        label
        symbol
      }
    }
    attributes {
      id
      name
      type
      items {
        id
        displayValue
        value
      }
    }
  }
`;

export const GetAllCategories = gql`
  query {
    categories {
      name
    }
  }
`;

export const GetAllProducts = gql`
  query Products($category: String) {
    products(category: $category) {
      ...ProductFields
    }
  }
  ${ProductFields}
`;

export const GetProduct = gql`
  query Product($id: String!) {
    product(id: $id) {
      ...ProductFields
    }
  }
  ${ProductFields}
`;
