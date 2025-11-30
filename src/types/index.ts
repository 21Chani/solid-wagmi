import type { DefaultError, QueryKey, UseInfiniteQueryOptions, UseQueryOptions, UseQueryResult } from '@tanstack/solid-query'
import type { Config } from '@wagmi/core'
import type { Compute, Omit } from '@wagmi/core/internal'
import type { ExactPartial } from 'viem'
 

export type EnabledParameter = {
  enabled?: boolean | undefined
}

export type ConfigParameter<config extends Config = Config> = {
  config?: Config | config | undefined
}

export type UseQueryReturnType<data = unknown, error = DefaultError> = Compute<
  UseQueryResult<data, error> & {
    queryKey: QueryKey
  }
>

export type UseInfiniteQueryParameters<
  queryFnData = unknown,
  error = DefaultError,
  data = queryFnData,
  queryKey extends QueryKey = QueryKey,
  pageParam = unknown,
> = Compute<
  Omit<
    ReturnType<UseInfiniteQueryOptions<
    queryFnData,
    error,
    data,
    queryKey,
    pageParam
  >>,
    'initialData'
  > & {
    // Fix `initialData` type
    initialData?:
      | ReturnType<UseInfiniteQueryOptions<
      queryFnData,
      error,
      data,
      queryKey
    >>['initialData']
      | undefined
  }
>

export type UseQueryParameters<
  queryFnData = unknown,
  error = DefaultError,
  data = queryFnData,
  queryKey extends QueryKey = QueryKey,
> = Compute<
  ExactPartial<
    Omit<ReturnType<UseQueryOptions<queryFnData, error, data, queryKey>>, 'initialData'>
  > & {
    // Fix `initialData` type
    initialData?:
      | ReturnType<UseQueryOptions<queryFnData, error, data, queryKey>>['initialData']
      | undefined
  }
>

export type QueryParameter<
  queryFnData = unknown,
  error = DefaultError,
  data = queryFnData,
  queryKey extends QueryKey = QueryKey,
> = {
  query?:
    | Omit<
        UseQueryParameters<queryFnData, error, data, queryKey>,
        'queryFn' | 'queryHash' | 'queryKey' | 'queryKeyHashFn' | 'throwOnError' |'initialData'
      >
    | undefined
}

export type InfiniteQueryParameter<
  queryFnData = unknown,
  error = DefaultError,
  data = queryFnData,
  queryKey extends QueryKey = QueryKey,
  pageParam = unknown,
> = {
  query: Omit<
    UseInfiniteQueryParameters<
      queryFnData,
      error,
      data,
      queryKey,
      pageParam
    >,
    'queryFn' | 'queryHash' | 'queryKey' | 'queryKeyHashFn' | 'throwOnError'
  >
}