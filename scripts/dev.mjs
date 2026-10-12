import { createServer } from "vite";
import { build, outputDirectory, sourceDirectory } from "./build.mjs";

await build();

const server = await createServer({
  configFile: false,
  root: outputDirectory,
  publicDir: false,
  appType: "mpa",
  cacheDir: new URL("../node_modules/.vite/", import.meta.url).pathname,
  server: {
    host: "127.0.0.1",
    port: 3000,
    strictPort: true,
    watch: { ignored: [`${outputDirectory}/**`] },
  },
});

await server.listen();
server.printUrls();
server.watcher.add(sourceDirectory);

let pendingBuild = Promise.resolve();
server.watcher.on("all", (_event, path) => {
  if (!path.startsWith(sourceDirectory)) return;
  pendingBuild = pendingBuild
    .then(() => build())
    .then(() => server.ws.send({ type: "full-reload" }))
    .catch((error) => console.error(error));
});
