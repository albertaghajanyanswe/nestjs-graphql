import { graphql } from "../../../gql";
import genMutation from "../generators/genMutation";

export const useCreateUserMutation = genMutation({
  document: graphql(/* GraphQL */ `
    mutation createUser($email: String, $username: String, $password: String!, $firstName: String!, $lastName: String!, $role: String) {
      createUser(user: {email: $email, username: $username, password: $password, firstName: $firstName, lastName: $lastName, role: $role}) {
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
  // onSuccess(queryClient, data, vairables) {
  //   queryClient.invalidateQueries(
  //     useGetUsersQuery.getKey({})
  //   )
  // }
})
