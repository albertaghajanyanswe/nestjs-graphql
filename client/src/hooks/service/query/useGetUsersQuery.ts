import { graphql } from "../../../gql";
import genQuery from "../generators/genQuery";
import { gql } from "@apollo/client"; // Import the gql tag from your GraphQL library


// Define the GraphQL query using gql tag
const GET_ALL_USERS_QUERY = gql`
  query getAllUsers {
    getAllUsers {
      id
    }
  }
`;

// Define types for your GraphQL query response
interface User {
  id: string;
}

interface GetAllUsersResponse {
  getAllUsers: User[];
}

export const useGetUsersQuery = genQuery({
  document: GET_ALL_USERS_QUERY, // Use the defined query
  options: {
    refetchOnMount: true,
  }
});

// export type UsersData = NonNullable<ReturnType<typeof useGetUsersQuery>["data"]>["list"][number];

// export const useGetUsersQuery1 = genQuery({
//   document: graphql(/* GraphQL */ `
//     query getAllUsers() {
//       getAllUsers() {
//         id
//       }
//     }
//   `),
//   options: {
//     refetchOnMount: true,
//   }
// })