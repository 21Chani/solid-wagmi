import { useMutation } from "@tanstack/solid-query";
import { disconnectMutationOptions } from "@wagmi/core/query";
import { createMemo, mergeProps } from "solid-js";
import { useConfig } from "./useConfig.js";
import { useConnections } from "./useConnections.js";

export function useDisconnect() {
  const config = useConfig();

  const connections = useConnections();
  const mutation = useMutation(() => ({
    ...disconnectMutationOptions(config()),
  }));

  const connectors = createMemo(() => connections().map((c) => c.connector));

  return mergeProps(mutation, {
    connectors,
  });
}
