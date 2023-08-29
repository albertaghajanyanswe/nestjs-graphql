import { graphql } from "../../../gql";
import genMutation from "../generators/genMutation";

export const useLoginMutation = genMutation({
  document: graphql(/* GraphQL */ `
    mutation login($email: String, $password: String!) {
      login(authLogin: {email: $email, password: $password}) {
        token
        user {
          id
          fullName
          firstName
          lastName
          email
          username
          role
        }
      }
    }
  `),
})
