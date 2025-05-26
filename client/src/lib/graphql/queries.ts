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
