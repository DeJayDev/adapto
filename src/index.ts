import { serve } from "@hono/node-server";
import { Hono } from "hono";

const app = new Hono();
app.get("/", (c) => c.text("Hello Hono!"));

// ---
serve(app, (addr) => {
  console.log(`Adapto vXYZ, bound to http://[${addr.address}]:${addr.port}`);
});
