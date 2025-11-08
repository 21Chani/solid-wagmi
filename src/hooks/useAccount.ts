import { getAccount, watchAccount } from "@wagmi/core";
import {
  createSignal,
  onCleanup,
  onMount,
} from "solid-js/types/server/reactive.js";
import { useConfig } from "./useConfig.js";

export function useAccount() {
  const { config } = useConfig();
  const [account, setAccount] = createSignal(getAccount(config));

  // Watch account
  let cleanup: VoidFunction;
  onMount(() => {
    cleanup = watchAccount(config, { onChange: setAccount });
  });
  onCleanup(() => cleanup?.());

  return account;
}
