import { renderHook as primitiveRenderHook } from "@solidjs/testing-library";
import { expect, test, vi } from "vitest";
import { renderHook } from "../../test/lib.js";
import { WagmiProviderNotFoundError } from "../errors/context.js";
import { useConfig } from "./useConfig.js";

test("mounts", async () => {
  const { config } = renderHook(() => useConfig());
  expect(config).toBeDefined();
});

test("behavior: throws when not inside Provider", () => {
  vi.spyOn(console, "error").mockImplementation(() => {});

  try {
    primitiveRenderHook(() => useConfig());
  } catch (error) {
    expect(error).toMatchInlineSnapshot(
      `[Error: ${WagmiProviderNotFoundError.MESSAGE}]`
    );
  }
});
