import { connect } from "@wagmi/core";
import { expect, test } from "vitest";
import { renderHook } from "../../test/lib.js";
import { useConfig } from "./useConfig.js";
import { useConnections } from "./useConnections.js";

test("default", async () => {
  const { config } = renderHook(useConfig);
  const connections = renderHook(() => useConnections());

  expect(connections()).toEqual([]);

  await connect(config, { connector: config.connectors[0]! });

  expect(connections().length).toBe(1);
});
