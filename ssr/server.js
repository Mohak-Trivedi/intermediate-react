import fastify from "fastify";
import fastifyStatic from "@fastify/static";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path, { dirname } from "node:path";
import { renderToString } from "react-dom/server";
import { createElement as h } from "react";
import App from "./App.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// getting the index.html file from the dist folder instead of the root folder because it will have the correct script tag urls
const shell = readFileSync(path.join(__dirname, "dist", "index.html"), "utf8");

const app = fastify();
app.register(fastifyStatic, {
  root: path.join(__dirname, "dist"),
  prefix: "/",
});

// Splitting it into two parts so that we can inject the server-rendered React app into the HTML template
// Also, so that we can serve the first part i.e. the head tag, so that while we render the React app, the browser can start downloading the JS and CSS files and fonts, etc. in parallel
const parts = shell.split("<!--ROOT-->");

// In Fastify, we can use the `reply.raw` object to write the response in chunks.
app.get("/", (req, reply) => {
  reply.raw.write(parts[0]);
  // renderToString includes React metadata needed for hydration and client-side interactivity, while renderToStaticMarkup generates a string without React-specific metadata, making it lighter but non-interactive.
  const reactApp = renderToString(h(App));
  reply.raw.write(reactApp);
  reply.raw.write(parts[1]);
  reply.raw.end();
});

app.listen({ port: 3000 });
