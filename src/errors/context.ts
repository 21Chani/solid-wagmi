export class WagmiProviderNotFoundError extends Error {
  public static MESSAGE = "`useConfig` must be used withtin <WagmiProvider/>";

  constructor() {
    super(WagmiProviderNotFoundError.MESSAGE);
  }
}
