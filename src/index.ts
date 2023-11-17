import { basename, dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url"
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { version } from "../package.json"
import { addDiscordRoutes } from "./routes/discord";
import { RunnableCommand } from "./types/command";
import { getFiles } from "./utils/path";

const app = new Hono();
app.get("/", (c) => c.text("Hello Hono!"));

addDiscordRoutes(app.basePath("/discord"));

//#region - Command Registration
const commands: Map<string, RunnableCommand> = new Map();
const commandsDir = join(dirname(fileURLToPath(import.meta.url)), 'commands');

for await (const file of getFiles(commandsDir)) {
    const command = await import(resolve(join(commandsDir, file.file)));
    const { data, execute } = command as RunnableCommand;
    data.name = data.name ?? basename(file.file, '.ts');
    const name = file.folder ? `${file.folder}.${data.name}` : data.name;
    console.log(`Registering command ${name}`);
    commands.set(name, { data, execute });
}
//#endregion

//#region - App Serving
serve(app, (addr) => {
    console.log(`Adapto v${version}, bound to http://[${addr.address}]:${addr.port}`);
});
//#endregion

// ---
export { commands }