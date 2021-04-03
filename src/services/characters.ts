import { gql } from "@apollo/client/core";

const GET_ALL_CHARS = gql`
  query characters($page: Int, $filter: FilterCharacter) {
    characters(page: $page, filter: $filter) {
      results {
        id
        image
        name
        species
        status
        origin {
          name
        }
      }
      info {
        pages
        count
      }
    }
  }
`;

const characterServices = {
  GET_ALL_CHARS,
};

export default characterServices;
