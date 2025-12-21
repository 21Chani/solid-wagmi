import { connect } from "@wagmi/core";

import { test } from "vitest";
import { config } from "../../test/config.js";
const connector = config.connectors[0]!;

test("default", async () => {
  await connect(config, { connector });
  // const account = renderHook(useAccount);

  // const write = await renderHook(() => useWriteContract());

  // const t = await write.writeContract({
  //   abi: abi.wagmiMintExample,
  //   address: address.wagmiMintExample,
  //   functionName: "mint",
  // });

  // await vi.waitUntil(() => write.isSuccess, { timeout: 50_000 });

  //   await disconnect(config, { connector });
});
