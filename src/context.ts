import {
  hydrate,
  type Config,
  type ResolvedRegister,
  type State,
} from "@wagmi/core";
import {
  createComponent,
  createContext,
  onMount,
  splitProps,
  type JSX,
} from "solid-js";

export const WagmiContext = createContext<
  ResolvedRegister["config"] | undefined
>(undefined);

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
    value: config,
    get children() {
      return rest.children;
    },
  });
}
