import { useQuery } from "@tanstack/solid-query";
import type {
  Config,
  ReadContractsErrorType,
  ResolvedRegister,
} from "@wagmi/core";
import {
  readContractsQueryOptions,
  type ReadContractsData,
  type ReadContractsOptions,
  type ReadContractsQueryFnData,
  type ReadContractsQueryKey,
} from "@wagmi/core/query";

import type { Compute } from "@wagmi/core/internal";
import { createMemo, type Accessor } from "solid-js";
import { type ContractFunctionParameters } from "viem";
import type {
  ConfigParameter,
  QueryParameter,
  UseQueryReturnType,
} from "../types/index.js";
import { useChainId } from "./useChainId.js";
import { useConfig } from "./useConfig.js";

export type UseReadContractsReturnType<
  contracts extends readonly unknown[] = readonly ContractFunctionParameters[],
  allowFailure extends boolean = true,
  selectData = ReadContractsData<contracts, allowFailure>
> = UseQueryReturnType<selectData, ReadContractsErrorType>;

export type UseReadContractsParameters<
  contracts extends readonly unknown[] = readonly ContractFunctionParameters[],
  allowFailure extends boolean = true,
  config extends Config = Config,
  selectData = ReadContractsData<contracts, allowFailure>
> = Compute<
  ReadContractsOptions<contracts, allowFailure, config> &
    ConfigParameter<config> &
    QueryParameter<
      ReadContractsQueryFnData<contracts, allowFailure>,
      ReadContractsErrorType,
      selectData,
      ReadContractsQueryKey<contracts, allowFailure, config>
    >
>;

export function useReadContracts<
  const contracts extends readonly unknown[],
  allowFailure extends boolean = true,
  config extends Config = ResolvedRegister["config"],
  selectData = ReadContractsData<contracts, allowFailure>
>(
  params: Accessor<
    UseReadContractsParameters<contracts, allowFailure, config, selectData>
  >
) {
  const contracts = createMemo(() => params().contracts ?? []);
  const config = useConfig(params);
  const chainId = useChainId();

  const contractsChainId = createMemo(() => {
    const firstChainId = (contracts()[0] as { chainId?: number } | undefined)
      ?.chainId;
    if (
      (contracts() as { chainId?: number }[]).every(
        (contract) => contract.chainId === firstChainId
      )
    )
      return firstChainId;
    return undefined;
  });

  const enabled = createMemo(() => {
    let isContractsValid = false;
    for (const contract of contracts()) {
      const { abi, address, functionName } =
        contract as ContractFunctionParameters;
      if (!abi || !address || !functionName) {
        isContractsValid = false;
        break;
      }
      isContractsValid = true;
    }
    return Boolean(isContractsValid && (params().query?.enabled ?? true));
  });

  return useQuery(() => {
    const { query = {} } = params();
    // @ts-ignore
    const code = params().code as Hex | undefined;

    const options = readContractsQueryOptions<Config, contracts, allowFailure>(
      config,
      { ...params(), chainId: contractsChainId() ?? chainId().id }
    );

    return {
      ...query,
      ...options,
      enabled,
    } as any;
  }) as UseReadContractsReturnType<contracts, allowFailure, selectData>;
}
