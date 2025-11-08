import { useContext } from "solid-js";
import { WagmiContext } from "../context";
import { WagmiProviderNotFoundError } from "../errors/context";

export function useConfig() {
  const config = useContext(WagmiContext);

  if (!config) throw new WagmiProviderNotFoundError();

  return config;
}
