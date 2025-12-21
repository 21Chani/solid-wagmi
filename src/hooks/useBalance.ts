import { useQuery } from "@tanstack/solid-query";
import type {
  Config,
  GetBalanceErrorType,
  ResolvedRegister,
} from "@wagmi/core";
import type { Compute } from "@wagmi/core/internal";
import {
  getBalanceQueryOptions,
  type GetBalanceData,
  type GetBalanceOptions,
  type GetBalanceQueryFnData,
  type GetBalanceQueryKey,
} from "@wagmi/core/query";
import type { ConfigParameter, QueryParameter } from "../types/index.js";
import { useChainId } from "./useChainId.js";
import { useConfig } from "./useConfig.js";

export type UseBalanceParameters<
  config extends Config = ResolvedRegister["config"],
  selectData = GetBalanceData
> = Compute<
  GetBalanceOptions<config> &
    ConfigParameter<config> &
    QueryParameter<
      GetBalanceQueryFnData,
      GetBalanceErrorType,
      selectData,
      GetBalanceQueryKey<config>
    >
>;
export function useBalance(params: () => UseBalanceParameters) {
  const config = useConfig(params);
  const chain = useChainId();

  const options = () =>
    getBalanceQueryOptions(config, { chainId: chain().id, ...params() });
  const enabled = () =>
    Boolean(params().address && (params().query?.enabled ?? true));

  return useQuery(() => ({
    ...options(),
    enabled: enabled(),
  }));
}
