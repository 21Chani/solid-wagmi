import type { Config, ResolvedRegister } from "@wagmi/core";
import { useContext, type Accessor } from "solid-js";
import { WagmiContext } from "../context.js";
import { WagmiProviderNotFoundError } from "../errors/context.js";
import type { ConfigParameter } from "../types/index.js";

export type UseConfigParameters<config extends Config = Config> = Accessor<
  ConfigParameter<config>
>;

export type UseConfigReturnType<config extends Config = Config> = config;

export function useConfig<config extends Config = ResolvedRegister["config"]>(
  parameters?: UseConfigParameters<config>
): UseConfigReturnType<config> {
  const config = parameters?.().config ?? useContext(WagmiContext);

  if (!config) throw new WagmiProviderNotFoundError();

  return config as UseConfigReturnType<config>;
}
