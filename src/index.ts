import { Hono } from "hono";
import { logger } from "hono/logger";
import { poweredBy } from "hono/powered-by";
import { bearerAuth } from "hono/bearer-auth";
import { cache } from "hono/cache";
import { HTTPException } from "hono/http-exception";

const app = new Hono<{
  Bindings: {
    KV: KVNamespace;
    BEARER_TOKEN: string;
  };
}>();

app.use(logger());
app.use(poweredBy({ serverName: "https://github.com/jakejarvis/shortty" }));

// change cache behavior if authorized
app.use(async (c, next) => {
  c.header("Vary", "Authorization");

  await next();
});

// handle auth
app.on(["POST", "PUT", "DELETE"], "*", async (c, next) => {
  if (c.env.BEARER_TOKEN === undefined) {
    throw new HTTPException(500, { message: "Worker is missing a BEARER_TOKEN secret, and it's kinda important." });
  }

  const auth = bearerAuth({
    token: c.env.BEARER_TOKEN,
  });

  return auth(c, next);
});

// homepage
app.get("/", async (c) => {
  return c.text("Hello from Shortty 🩳");
});

// retrieve long URL and redirect
app.get(
  "/:shortcode{[a-zA-Z0-9]+}",
  cache({
    cacheName: "shortty_redirect",
    cacheControl: "public, s-maxage=31536000",
    vary: ["Authorization"],
  }),
  async (c) => {
    const value = await c.env.KV.get(c.req.param("shortcode"));

    if (!value) {
      return c.notFound();
    }

    return c.redirect(new URL(value), 301);
  }
);

// add random shortcode
app.post("/", async (c) => {
  const url = c.req.header("URL");

  if (!url) {
    throw new HTTPException(400, { message: "No destination URL provided. Please set a 'URL' header." });
  }

  // TODO: check for collisions, however unlikely
  const shortcode = Math.random().toString(36).slice(5);

  await c.env.KV.put(shortcode, url);

  return c.json({
    message: "URL created succesfully!",
    key: shortcode,
    short_url: new URL(`/${shortcode}`, c.req.url).toString(),
    long_url: url,
  });
});

// add specific shortcode
app.put("/:shortcode{[a-zA-Z0-9]+}", async (c) => {
  const url = c.req.header("URL");

  if (!url) {
    throw new HTTPException(400, { message: "No destination URL provided. Please set a 'URL' header." });
  }

  await c.env.KV.put(c.req.param("shortcode"), url);

  return c.json({
    message: "URL created succesfully!",
    key: c.req.param("shortcode"),
    short_url: new URL(`/${c.req.param("shortcode")}`, c.req.url).toString(),
    long_url: url,
  });
});

// delete specific shortcode
app.delete("/:shortcode{[a-zA-Z0-9]+}", async (c) => {
  const value = await c.env.KV.get(c.req.param("shortcode"));

  if (!value) {
    return c.notFound();
  }

  await c.env.KV.delete(c.req.param("shortcode"));

  return c.json({
    message: "Short code deleted succesfully.",
    key: c.req.param("shortcode"),
  });
});

// catch-all
app.all("*", (c) => {
  return c.notFound();
});

export default app;
