import { expect, test, vi } from "vitest";
import { abi, address } from "../../test/constants.js";
import { renderHook } from "../../test/lib.js";
import { useReadContract } from "./useReadContract.js";

test("default", async () => {
  const result = renderHook(() =>
    useReadContract(() => ({
      address: address.wagmiMintExample,
      abi: abi.wagmiMintExample,
      functionName: "balanceOf",
      args: ["0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC"] as const,
      chainId: 1,
    }))
  );

  await vi.waitUntil(() => result.isSuccess, { timeout: 10_000 });

  expect(result.data).toMatchInlineSnapshot(`10n`);
});
