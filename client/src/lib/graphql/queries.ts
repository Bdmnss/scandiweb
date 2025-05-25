import { gql } from "@apollo/client";

export const GetAllCategories = gql`
  query {
    categories {
      name
    }
  }
`;
