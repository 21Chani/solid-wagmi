import { useMutation } from "@tanstack/solid-query";
import { connectMutationOptions } from "@wagmi/core/query";
import { createEffect, onCleanup } from "solid-js";
import { useConfig } from "./useConfig.js";

export function useConnect() {
  const config = useConfig();

  const mutationOptions = connectMutationOptions(config());
  const { mutate, mutateAsync, ...result } = useMutation(() => ({
    ...mutationOptions,
  }));

  // Reset mutation back to an idle state when the connector disconnects.
  createEffect(() => {
    const unsub = config().subscribe(
      ({ status }) => status,
      (status, previousStatus) => {
        if (previousStatus === "connected" && status === "disconnected")
          result.reset();
      }
    );
    onCleanup(() => unsub());
  });

  return {
    ...result,
    connect: mutate,
    connectAsync: mutateAsync,
  };
}
