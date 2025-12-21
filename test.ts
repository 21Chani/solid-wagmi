import { createServer } from "prool";
import { anvil } from "prool/instances";

async function main() {
  const server = createServer({ instance: anvil() });
  const stop = await server.start();
  console.log("Server started");

  // Wait a few seconds then test. Or keep alive.
  setTimeout(async () => {
    await stop();
    console.log("Server stopped");
  }, 60000);
}

main().catch(console.error);
