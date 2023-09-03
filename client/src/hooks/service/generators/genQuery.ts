// import { QueryClient, useQuery, UseQueryOptions } from "@tanstack/react-query"
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

// type UseQueryOptionsArg<Q, R> = Omit<UseQueryOptions<Q, unknown, R, any>, 'queryKey' | 'queryFn' | 'initialData'>

// // Inspired by: https://grrr.tech/posts/2021/typescript-partial/

// type PartialDeep<K> = K extends Record<any, never> ? K : {
//   [attr in keyof K]?: K[attr] extends object ? PartialDeep<K[attr]> : K[attr];
// } | null | undefined;

// export default function genQuery<Q, V, R>({document, getKey, options}: {
//   document: TypedDocumentNode<Q, V>, 
//   getKey?: (...v: OptionalArgs<PartialDeep<V>>) => unknown[],
//   options?: UseQueryOptionsArg<Q, R>
// }) {
//   const operationName = getOperationName(document)
//   const getKeyCur = getKey || ((...v: OptionalArgs<PartialDeep<V>>) => v && v[0] && Object.keys(v[0]).length ? [operationName, ...v] : [operationName])
//   const useCustomQuery = (...v: OptionalArgsExt<V, UseQueryOptionsArg<Q, R>>) => useQuery<Q, any, R, unknown[]>(
//     getKeyCur(...(v as OptionalArgs<PartialDeep<V>>)), 
//     async () => request<Q, V>(
//       '/api/proxy/graphql', 
//       document,
//       ...(v as OptionalArgs<V>)
//     ), 
//     {...options, ...v[1]}
//   )
//   useCustomQuery.getKey = getKeyCur
//   useCustomQuery.prefetch = ({queryClient, variables, requestHeaders, baseUrl}: {
//     queryClient: QueryClient,
//     variables: V,
//     requestHeaders?: HeadersInit,
//     baseUrl?: string
//   }) => queryClient.prefetchQuery(
//     getKeyCur(...[variables] as any), 
//     async () => request<Q, V>({
//       url: (baseUrl||process.env.NEXT_PUBLIC_API_URL||"") + '/api/proxy/graphql',
//       document,
//       requestHeaders,
//       ...({variables} as any)
//     })
//   )
//   return useCustomQuery 
// }



import { QueryClient, useQuery, UseQueryOptions } from "@tanstack/react-query"
import { DocumentNode, OperationDefinitionNode } from "graphql"
import request, { Variables } from "graphql-request";
import { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { getCurrentUser } from "../../../services/lsService";

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

type UseQueryOptionsArg<Q, R> = Omit<UseQueryOptions<Q, unknown, R, any>, 'queryKey' | 'queryFn' | 'initialData'>

// Inspired by: https://grrr.tech/posts/2021/typescript-partial/

type PartialDeep<K> = K extends Record<any, never> ? K : {
  [attr in keyof K]?: K[attr] extends object ? PartialDeep<K[attr]> : K[attr];
} | null | undefined;

export default function genQuery<Q, V extends Variables, R>({ document, getKey, options }: {
  document: TypedDocumentNode<Q, V>,
  getKey?: (...v: OptionalArgs<PartialDeep<V>>) => unknown[],
  options?: UseQueryOptionsArg<Q, R>
}) {
  const operationName = getOperationName(document)
  const getKeyCur = getKey || ((...v: OptionalArgs<PartialDeep<V>>) => v && v[0] && Object.keys(v[0]).length ? [operationName, ...v] : [operationName])

  const useCustomQuery = (...v: OptionalArgsExt<V, UseQueryOptionsArg<Q, R>>) => useQuery<Q, any, R, unknown[]>(
    getKeyCur(...(v as OptionalArgs<PartialDeep<V>>)),
    async () => {

      const jwtToken = getCurrentUser()?.login?.token;
      if (jwtToken) {
        const headers = {
          Authorization: `Bearer ${getCurrentUser()?.login?.token}`,
        };
        v.push(headers);
      }

      return request<Q, V>(
      '/graphql',
      document,
      ...(v as OptionalArgs<V>),
    )},
    { ...options, ...v[1] }
  )

  useCustomQuery.getKey = getKeyCur
  useCustomQuery.prefetch = ({ queryClient, variables, requestHeaders, baseUrl }: {
    queryClient: QueryClient,
    variables: V,
    requestHeaders?: HeadersInit,
    baseUrl?: string
  }) => {
    return queryClient.prefetchQuery(
      getKeyCur(...[variables] as any),
      async () => request<Q, V>({
        url: (baseUrl || process.env.NEXT_PUBLIC_API_URL || "") + '/graphql',
        document,
        requestHeaders,
        ...({ variables } as any)
      })
    )
  }
  return useCustomQuery
}
