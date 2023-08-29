// import { MutationFunction, QueryClient, useMutation, UseMutationOptions, useQuery, useQueryClient, UseQueryOptions } from "@tanstack/react-query"
// import { DocumentNode, OperationDefinitionNode } from "graphql"
// import request, { Variables } from "graphql-request";
// import { TypedDocumentNode } from '@graphql-typed-document-node/core';
// import { RemoveIndex } from "graphql-request/dist/types";
// import { getOperationName, OptionalArgs } from "./genQuery";

// type UseMutationOptionsArg<Q, V> = Omit<UseMutationOptions<Q, unknown, V>, 'mutationFn'>

// export default function genMutation<Q, V>({document, options, onSuccess, onError}: {
//   document: TypedDocumentNode<Q, V>, 
//   options?: UseMutationOptionsArg<Q, V>,
//   onSuccess?: (queryClient: QueryClient, data: Q, vairables: V) => void
//   onError?: (queryClient: QueryClient, error: any, vairables: V) => void
// }) {
//   const useCustomQuery = (optionsInner?: UseMutationOptionsArg<Q, V>) => {
//     const queryClient = useQueryClient()
//     return useMutation<Q, unknown, V>(
//       (async (...v: OptionalArgs<V>) => request<Q, V>(
//         '/api/proxy/graphql', 
//         document,
//         ...v
//       )) as MutationFunction<Q, V>, 
//       {
//         ...options, ...optionsInner,
//         onSuccess: (data, v, ctx) => {
//           options?.onSuccess?.(data, v, ctx)
//           optionsInner?.onSuccess?.(data, v, ctx)
//           onSuccess?.(queryClient, data, v)
//         },
//         onError: (error, v, ctx) => {
//           options?.onError?.(error, v, ctx)
//           optionsInner?.onError?.(error, v, ctx)
//           onError?.(queryClient, error, v)
//         }
//       }
//     )
//   }
//   return useCustomQuery 
// }


import { MutationFunction, QueryClient, useMutation, UseMutationOptions, useQuery, useQueryClient, UseQueryOptions } from "@tanstack/react-query"
import { DocumentNode, OperationDefinitionNode } from "graphql"
import request, { Variables } from "graphql-request";
import { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { OptionalArgs } from "./genQuery";

type UseMutationOptionsArg<Q, V> = Omit<UseMutationOptions<Q, unknown, V>, 'mutationFn'>

export default function genMutation<Q, V extends Variables>({document, options, onSuccess, onError}: {
  document: TypedDocumentNode<Q, V>, 
  options?: UseMutationOptionsArg<Q, V>,
  onSuccess?: (queryClient: QueryClient, data: Q, vairables: V) => void
  onError?: (queryClient: QueryClient, error: any, vairables: V) => void
}) {
  const useCustomQuery = (optionsInner?: UseMutationOptionsArg<Q, V>) => {
    const queryClient = useQueryClient()
    return useMutation<Q, unknown, V>(
      (async (...v: OptionalArgs<V>) => request<Q, V>(
        '/graphql', 
        document,
        ...v
      )) as MutationFunction<Q, V>, 
      {
        ...options, ...optionsInner,
        onSuccess: (data, v, ctx) => {
          options?.onSuccess?.(data, v, ctx)
          optionsInner?.onSuccess?.(data, v, ctx)
          onSuccess?.(queryClient, data, v)
        },
        onError: (error, v, ctx) => {
          options?.onError?.(error, v, ctx)
          optionsInner?.onError?.(error, v, ctx)
          onError?.(queryClient, error, v)
        }
      }
    )
  }
  return useCustomQuery 
}