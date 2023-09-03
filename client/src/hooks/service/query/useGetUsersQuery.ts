// import { graphql } from "../../../gql";
// import genQuery from "../generators/genQuery";
// import { gql } from "@apollo/client"; // Import the gql tag from your GraphQL library


// // Define the GraphQL query using gql tag
// const GET_ALL_USERS_QUERY = gql`
//   query getAllUsers {
//     getAllUsers {
//       id
//       fullName
//       firstName
//       lastName
//       email
//       username
//       role
//     }
//   }
// `;

// // Define types for your GraphQL query response
// interface User {
//   id: string;
//   fullName: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   username: string;
//   role: string;
// }

// export const useGetUsersQuery = genQuery({
//   document: GET_ALL_USERS_QUERY, // Use the defined query
//   options: {
//     refetchOnMount: true,
//   }
// });


import { graphql } from "../../../gql";
import genQuery from "../generators/genQuery";
import { gql } from "@apollo/client"; // Import the gql tag from your GraphQL library

export type UsersData = NonNullable<ReturnType<typeof useGetUsersQuery>["data"]>["list"][number];

export const useGetUsersQuery = genQuery({
  document: graphql(/* GraphQL */ `
    query getAllUsers {
      getAllUsers {
        id
        fullName
        firstName
        lastName
        email
        username
        role
      }
    }
  `),
  options: {
    refetchOnMount: true,
    select: (data) => data?.getAllUsers ? {
      list: data?.getAllUsers,
      totalCount: data?.getAllUsers?.length
    } : undefined
  }
})