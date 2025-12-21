import { useMutation } from "@tanstack/solid-query";
import type {
  Config,
  ResolvedRegister,
  WriteContractErrorType,
} from "@wagmi/core";
import {
  writeContractMutationOptions,
  type WriteContractData,
  type WriteContractMutate,
  type WriteContractMutateAsync,
  type WriteContractVariables,
} from "@wagmi/core/query";
import type { Accessor } from "solid-js";
import type { Abi } from "viem";
import type {
  ConfigParameter,
  UseMutationParameters,
  UseMutationReturnType,
} from "../types/index.js";
import { useConfig } from "./useConfig.js";

export type UseWriteContractParameters<
  config extends Config = Config,
  context = unknown
> = ConfigParameter<config> & {
  mutation?:
    | UseMutationParameters<
        WriteContractData,
        WriteContractErrorType,
        WriteContractVariables<
          Abi,
          string,
          readonly unknown[],
          config,
          config["chains"][number]["id"]
        >,
        context
      >
    | undefined;
};

export type UseWriteContractReturnType<
  config extends Config = Config,
  context = unknown
> = UseMutationReturnType<
  WriteContractData,
  WriteContractErrorType,
  WriteContractVariables<
    Abi,
    string,
    readonly unknown[],
    config,
    config["chains"][number]["id"]
  >,
  context
> & {
  writeContract: WriteContractMutate<config, context>;
  writeContractAsync: WriteContractMutateAsync<config, context>;
};

export function useWriteContract<
  config extends Config = ResolvedRegister["config"],
  context = unknown
>(
  params: Accessor<UseWriteContractParameters<config, context>> = () => ({})
): UseWriteContractReturnType<config, context> {
  const config = useConfig();

  const mutationOptions = writeContractMutationOptions(config());
  const { mutate, mutateAsync, ...result } = useMutation(() => {
    const mutation = params?.().mutation;

    return {
      ...(mutation ?? {}),
      ...mutationOptions,
    };
  });

  type Return = UseWriteContractReturnType<config, context>;
  return {
    ...(result as Return),
    writeContract: mutate as Return["writeContract"],
    writeContractAsync: mutateAsync as Return["writeContractAsync"],
  };
}
