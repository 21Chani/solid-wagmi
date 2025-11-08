import { Config, hydrate, State } from "@wagmi/core";
import {
  createComponent,
  createContext,
  type JSX,
  onMount,
  splitProps,
} from "solid-js";

export type WagmiCtx = {
  config: Config;
  initialState: State;
};

export const WagmiContext = createContext<WagmiCtx>();

export function WagmiProvider(props: {
  config: Config;
  initialState?: State;
  reconnectOnMount?: boolean;
  children: JSX.Element;
}) {
  const [wagmiProps, rest] = splitProps(props, [
    "config",
    "initialState",
    "reconnectOnMount",
  ]);
  const { config, initialState, reconnectOnMount } = wagmiProps;

  const hydration = hydrate(config, { initialState, reconnectOnMount });

  if (!config._internal.ssr) hydration.onMount();
  onMount(() => {
    if (config._internal.ssr) hydration.onMount();
  });

  return createComponent(WagmiContext.Provider, {
    value: { config, initialState },
    ...rest,
  });
}
