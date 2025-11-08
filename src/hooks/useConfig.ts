import { useContext } from "solid-js";
import { WagmiContext } from "../context.js";
import { WagmiProviderNotFoundError } from "../errors/context.js";

export function useConfig() {
  const config = useContext(WagmiContext);

  if (!config) throw new WagmiProviderNotFoundError();

  return config;
}
