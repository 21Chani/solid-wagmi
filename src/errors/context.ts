export class WagmiProviderNotFoundError extends Error {
  constructor() {
    super("`useConfig` must be used withtin <WagmiProvider/>");
  }
}
