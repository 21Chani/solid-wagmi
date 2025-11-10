import { useQuery } from "@tanstack/solid-query";
import type { Config } from "@wagmi/core";
import {
  readContractQueryOptions,
  type ReadContractOptions,
} from "@wagmi/core/query";

import { createMemo } from "solid-js";
import {
  type Abi,
  type ContractFunctionArgs,
  type ContractFunctionName,
} from "viem";
import { useConfig } from "./useConfig.js";

export function useReadContract<
  abi extends Abi,
  functionName extends ContractFunctionName<abi, "pure" | "view">,
  args extends ContractFunctionArgs<abi, "pure" | "view", functionName>
>(params: () => ReadContractOptions<abi, functionName, args, Config>) {
  const { config } = useConfig();

  const enabled = createMemo(() => {
    const { address, functionName, abi } = params();
    return Boolean(address && functionName && abi);
  });

  return useQuery(() => ({
    ...readContractQueryOptions<Config, abi, functionName, args>(
      config,
      params()
    ),
    enabled: enabled(),
  }));
}
