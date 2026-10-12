import { createServer } from "vite";
import { readFile } from "node:fs/promises";
import { build, outputDirectory, sourceDirectory } from "./build.mjs";

await build();

const routing = JSON.parse(await readFile(new URL("../vercel.json", import.meta.url), "utf8"));
const mobilePattern = new RegExp(routing.rewrites[0].has[0].value);

const server = await createServer({
  configFile: false,
  root: outputDirectory,
  publicDir: false,
  appType: "mpa",
  cacheDir: new URL("../node_modules/.vite/", import.meta.url).pathname,
  plugins: [{
    name: "device-pages",
    configureServer(server) {
      server.middlewares.use((request, response, next) => {
        const url = new URL(request.url, "http://localhost");
        const path = url.pathname;
        if (path !== "/" && !/^\/(category|articles)\/[a-z0-9-]+\/?$/.test(path)) {
          return next();
        }
        const device = mobilePattern.test(request.headers["user-agent"] ?? "") ? "mobile" : "pc";
        response.setHeader("Vary", "User-Agent");
        request.url = `/${device}${path.endsWith("/") ? path : `${path}/`}index.html${url.search}`;
        next();
      });
    },
  }],
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
    .then(() => {
      server.moduleGraph.invalidateAll();
      server.ws.send({ type: "full-reload" });
    })
    .catch((error) => console.error(error));
});
