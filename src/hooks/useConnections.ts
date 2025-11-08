import { getConnections, watchConnections } from "@wagmi/core";
import { createSignal, onCleanup, onMount } from "solid-js";
import { useConfig } from "./useConfig.js";

export function useConnections() {
  const { config } = useConfig();
  const [connections, setConnections] = createSignal(getConnections(config));

  let cleanup: VoidFunction | undefined;
  onMount(() => {
    cleanup = watchConnections(config, { onChange: setConnections });
  });
  onCleanup(() => cleanup?.());

  return connections;
}
