import { useMutation } from "@tanstack/solid-query";
import { disconnectMutationOptions } from "@wagmi/core/query";
import { createMemo } from "solid-js";
import { useConfig } from "./useConfig.js";
import { useConnections } from "./useConnections.js";

export function useDisconnect() {
  const { config } = useConfig();

  const connections = useConnections();
  const mutationOptions = disconnectMutationOptions(config);
  const { mutate, mutateAsync, ...result } = useMutation(() => ({
    ...mutationOptions,
  }));

  const connectors = createMemo(() => connections().map((c) => c.connector));

  return {
    ...result,
    connectors,
    disconnect: mutate,
    disconnectAsync: mutateAsync,
  };
}
