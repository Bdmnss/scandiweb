import { gql } from "@apollo/client";

export const GetAllCategories = gql`
  query {
    categories {
      name
    }
  }
`;

export const GetPricesByProductId = gql`
  query Prices($productId: String!) {
    prices(productId: $productId) {
      amount
      currency {
        label
        symbol
      }
    }
  }
`;

export const GetImagesByProductId = gql`
  query Images($productId: String!) {
    images(productId: $productId) {
      url
    }
  }
`;

export const GetAttributesByProductId = gql`
  query Attributes($productId: String!) {
    attributes(productId: $productId) {
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
