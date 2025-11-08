import { getChainId, watchChainId } from "@wagmi/core";
import { createMemo, createSignal, onCleanup, onMount } from "solid-js";
import { extractChain } from "viem";

import { useConfig } from "./useConfig.js";

export function useChainId() {
  const { config } = useConfig();
  const [chainId, setChainID] = createSignal(getChainId(config));

  // Watch chain id
  let cleanup: VoidFunction;
  onMount(() => {
    cleanup = watchChainId(config, { onChange: setChainID });
  });
  onCleanup(() => cleanup?.());

  const chain = createMemo(() =>
    extractChain({ chains: config.chains, id: chainId() })
  );

  return chain;
}
