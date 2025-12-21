import { describe, expect, it } from "vitest";
import { mainnet2 } from "../../test/chains.js";
import { renderHook } from "../../test/lib.js";
import { useChainId } from "./useChainId.js";
import { useConfig } from "./useConfig.js";

describe("useChainId", () => {
  it("default", async () => {
    const chain = renderHook(useChainId);
    const config = renderHook(useConfig);

    expect(chain().id).toMatchInlineSnapshot("1");

    config.setState({ ...config.state, chainId: mainnet2.id });

    expect(chain().id).toMatchInlineSnapshot(`${mainnet2.id}`);
  });
});
