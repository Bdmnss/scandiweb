import { gql } from "@apollo/client";

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
  }
`;
