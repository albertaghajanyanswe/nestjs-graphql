// import { QueryClient, useInfiniteQuery, UseInfiniteQueryOptions, useQueryClient } from "@tanstack/react-query"
// import { DocumentNode, OperationDefinitionNode } from "graphql"
// import request, { Variables } from "graphql-request";
// import { TypedDocumentNode } from '@graphql-typed-document-node/core';

// export function getOperationName(doc: DocumentNode): string | null {
//   return (
//     doc.definitions
//       .filter(
//         definition =>
//           definition.kind === 'OperationDefinition' && definition.name,
//       )
//       .map((x) => (x as OperationDefinitionNode)!.name!.value)[0] || null
//   );
// }

// export type OptionalArgs<T> = T extends Record<any, never> ? [t?: T] : [t: T];
// export type OptionalArgsExt<T, V> = T extends Record<any, never> ? [t?: T, v?: V] : [t: T, v?: V];

// type UseInfiniteQueryOptionsArg<Q, R> = Omit<UseInfiniteQueryOptions<Q, unknown, R, Q, any>, 'queryKey' | 'queryFn' | 'initialData'>

// // Inspired by: https://grrr.tech/posts/2021/typescript-partial/

// type PartialDeep<K> = K extends Record<any, never> ? K : {
//   [attr in keyof K]?: K[attr] extends object ? PartialDeep<K[attr]> : K[attr];
// } | null | undefined;

// export default function genInfiniteQuery<Q, V, R>({ document, getKey, options }: {
//   document: TypedDocumentNode<Q, V>,
//   getKey?: (...v: OptionalArgs<PartialDeep<V>>) => unknown[],
//   options?: UseInfiniteQueryOptionsArg<Q, R>
// }) {

//   const operationName = getOperationName(document)
//   const getKeyCur = getKey || ((...v: OptionalArgs<PartialDeep<V>>) => v && v[0] && Object.keys(v[0]).length ? [operationName, ...v] : [operationName])
//   const useCustomQuery = (...v: OptionalArgsExt<V, UseInfiniteQueryOptionsArg<Q, R>>) => {
//     const queryClient = useQueryClient();
//     return useInfiniteQuery(
//       getKeyCur(...(v as OptionalArgs<PartialDeep<V>>)),
//       async ({ pageParam }) => {
//         const allArgs = [...v]
//         allArgs[0] = { ...allArgs[0], ...pageParam }
//         return request<Q, V>(
//           '/api/proxy/graphql',
//           document,
//           ...(allArgs as OptionalArgs<V>)
//         )
//       },
//       {
//         ...options,
//         ...v[1],
//         onError: () => {
//           const data = queryClient.getQueryCache().find(getKeyCur(...(v as OptionalArgs<PartialDeep<V>>)))?.state?.data as any;
//           if (data?.pages?.[0]) {
//             queryClient.removeQueries(getKeyCur(...(v as OptionalArgs<PartialDeep<V>>)))
//           }
//         }
//       }
//     )
//   }
//   useCustomQuery.getKey = getKeyCur
//   useCustomQuery.prefetch = ({ queryClient, variables, requestHeaders }: {
//     queryClient: QueryClient,
//     variables: V,
//     requestHeaders?: HeadersInit
//   }) => queryClient.prefetchQuery(
//     getKeyCur(...[variables] as any),
//     async ({ pageParam }) => request<Q, V>({
//       url: (process.env.NEXT_PUBLIC_API_URL || "") + '/api/proxy/graphql',
//       document,
//       requestHeaders,
//       ...({ variables: { ...variables, ...pageParam } } as any)
//     })
//   )
//   return useCustomQuery
// }


import { QueryClient, useInfiniteQuery, UseInfiniteQueryOptions, useQueryClient } from "@tanstack/react-query"
import { DocumentNode, OperationDefinitionNode } from "graphql"
import request, { Variables } from "graphql-request";
import { TypedDocumentNode } from '@graphql-typed-document-node/core';

export function getOperationName(doc: DocumentNode): string | null {
  return (
    doc.definitions
      .filter(
        definition =>
          definition.kind === 'OperationDefinition' && definition.name,
      )
      .map((x) => (x as OperationDefinitionNode)!.name!.value)[0] || null
  );
}

export type OptionalArgs<T> = T extends Record<any, never> ? [t?: T] : [t: T];
export type OptionalArgsExt<T, V> = T extends Record<any, never> ? [t?: T, v?: V] : [t: T, v?: V];

type UseInfiniteQueryOptionsArg<Q, R> = Omit<UseInfiniteQueryOptions<Q, unknown, R, Q, any>, 'queryKey' | 'queryFn' | 'initialData'>

// Inspired by: https://grrr.tech/posts/2021/typescript-partial/

type PartialDeep<K> = K extends Record<any, never> ? K : {
  [attr in keyof K]?: K[attr] extends object ? PartialDeep<K[attr]> : K[attr];
} | null | undefined;

export default function genInfiniteQuery<Q, V extends Variables, R>({ document, getKey, options }: {
  document: TypedDocumentNode<Q, V>,
  getKey?: (...v: OptionalArgs<PartialDeep<V>>) => unknown[],
  options?: UseInfiniteQueryOptionsArg<Q, R>
}) {

  const operationName = getOperationName(document)
  const getKeyCur = getKey || ((...v: OptionalArgs<PartialDeep<V>>) => v && v[0] && Object.keys(v[0]).length ? [operationName, ...v] : [operationName])
  const useCustomQuery = (...v: OptionalArgsExt<V, UseInfiniteQueryOptionsArg<Q, R>>) => {
    const queryClient = useQueryClient();
    return useInfiniteQuery(
      getKeyCur(...(v as OptionalArgs<PartialDeep<V>>)),
      async ({ pageParam }) => {
        const allArgs = [...v]
        allArgs[0] = { ...allArgs[0], ...pageParam }
        return request<Q, V>(
          '/api/proxy/graphql',
          document,
          ...(allArgs as OptionalArgs<V>)
        )
      },
      {
        ...options,
        ...v[1],
        onError: () => {
          const data = queryClient.getQueryCache().find(getKeyCur(...(v as OptionalArgs<PartialDeep<V>>)))?.state?.data as any;
          if (data?.pages?.[0]) {
            queryClient.removeQueries(getKeyCur(...(v as OptionalArgs<PartialDeep<V>>)))
          }
        }
      }
    )
  }
  useCustomQuery.getKey = getKeyCur
  useCustomQuery.prefetch = ({ queryClient, variables, requestHeaders }: {
    queryClient: QueryClient,
    variables: V,
    requestHeaders?: HeadersInit
  }) => queryClient.prefetchQuery(
    getKeyCur(...[variables] as any),
    async ({ pageParam }) => request<Q, V>({
      url: (process.env.NEXT_PUBLIC_API_URL || "") + '/api/proxy/graphql',
      document,
      requestHeaders,
      ...({ variables: { ...variables, ...pageParam } } as any)
    })
  )
  return useCustomQuery
}
