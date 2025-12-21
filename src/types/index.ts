import type {
  DefaultError,
  QueryKey,
  SolidMutationOptions,
  SolidQueryOptions,
  UseInfiniteQueryOptions,
  UseMutationResult,
  UseQueryResult,
} from "@tanstack/solid-query";
import type { Config } from "@wagmi/core";
import type {
  Compute,
  ExactPartial,
  Omit,
  UnionStrictOmit,
} from "@wagmi/core/internal";

export type EnabledParameter = {
  enabled?: boolean | undefined;
};

export type ConfigParameter<config extends Config = Config> = {
  config?: Config | config | undefined;
};

export type UseQueryReturnType<data = unknown, error = DefaultError> = Compute<
  UseQueryResult<data, error>
>;
export type UseInfiniteQueryParameters<
  queryFnData = unknown,
  error = DefaultError,
  data = queryFnData,
  queryKey extends QueryKey = QueryKey,
  pageParam = unknown
> = Compute<
  Omit<
    ReturnType<
      UseInfiniteQueryOptions<queryFnData, error, data, queryKey, pageParam>
    >,
    "initialData"
  > & {
    // Fix `initialData` type
    initialData?:
      | ReturnType<
          UseInfiniteQueryOptions<queryFnData, error, data, queryKey>
        >["initialData"]
      | undefined;
  }
>;

export type UseMutationReturnType<
  data = unknown,
  error = Error,
  variables = void,
  context = unknown
> = Compute<
  UnionStrictOmit<
    UseMutationResult<data, error, variables, context>,
    "mutate" | "mutateAsync"
  >
>;

export type UseMutationParameters<
  data = unknown,
  error = Error,
  variables = void,
  context = unknown
> = Compute<
  Omit<
    SolidMutationOptions<data, error, Compute<variables>, context>,
    "mutationFn" | "mutationKey" | "throwOnError"
  >
>;

export type UseQueryParameters<
  queryFnData = unknown,
  error = DefaultError,
  data = queryFnData,
  queryKey extends QueryKey = QueryKey
> = Compute<
  ExactPartial<
    Omit<SolidQueryOptions<queryFnData, error, data, queryKey>, "initialData">
  > & {
    // Fix `initialData` type
    initialData?:
      | SolidQueryOptions<queryFnData, error, data, queryKey>["initialData"]
      | undefined;
  }
>;

export type QueryParameter<
  queryFnData = unknown,
  error = DefaultError,
  data = queryFnData,
  queryKey extends QueryKey = QueryKey
> = {
  query?:
    | Omit<
        UseQueryParameters<queryFnData, error, data, queryKey>,
        "queryFn" | "queryHash" | "queryKey" | "queryKeyHashFn" | "throwOnError"
      >
    | undefined;
};

export type InfiniteQueryParameter<
  queryFnData = unknown,
  error = DefaultError,
  data = queryFnData,
  queryKey extends QueryKey = QueryKey,
  pageParam = unknown
> = {
  query: Omit<
    UseInfiniteQueryParameters<queryFnData, error, data, queryKey, pageParam>,
    "queryFn" | "queryHash" | "queryKey" | "queryKeyHashFn" | "throwOnError"
  >;
};
