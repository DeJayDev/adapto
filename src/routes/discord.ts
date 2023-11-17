import { APIChatInputApplicationCommandInteraction, APIInteraction, APIInteractionResponseChannelMessageWithSource, APIInteractionResponsePong, ApplicationCommandOptionType, InteractionResponseType, InteractionType, MessageFlags } from "discord-api-types/v10";
import { isValidRequest } from "discord-verify/node";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { commands } from "..";
import config from "../../config.json";

function addDiscordRoutes(app: Hono) {

    app.use("*", logger());

    app.use("*", async (c, next) => {
        const isValid = await isValidRequest(c.req.raw, config.discord.publicKey);

        if (!isValid) {
            c.status(401);
            return c.text("Invalid signature");
        }

        await next(); // welcome our discord overlords, continue.
    });

    app.post("/interactions", async (c) => {
        const req = await c.req.json();
        let interaction = req as APIInteraction;

        if (interaction.type === InteractionType.Ping) {
            return c.json<APIInteractionResponsePong>({
                type: InteractionResponseType.Pong
            });
        } 

        if (interaction.type === InteractionType.ApplicationCommand) {
            interaction = interaction as APIChatInputApplicationCommandInteraction;
            const subcommand = interaction.data.options?.find(sub => sub.type === ApplicationCommandOptionType.Subcommand) // WHAT THE FUCK!!!

            const commandStr = subcommand?.name ? `${interaction.data.name}.${subcommand?.name}` : interaction.data.name;
            const command = commands.get(commandStr)
            
            if (!command) {
                const error = `Received an interaction for \`${commandStr}\` but no command is registered to handle it.`
                console.error(error);
                return c.json<APIInteractionResponseChannelMessageWithSource>({
                    type: InteractionResponseType.ChannelMessageWithSource,
                    data: {
                        content: error,
                        flags: MessageFlags.Ephemeral
                    }
                });
            }

            console.log(commands);
            const response = await command.execute(interaction);
            return c.json(response);

        } else {
            return c.json<APIInteractionResponseChannelMessageWithSource>({
                type: InteractionResponseType.ChannelMessageWithSource,
                data: {content: "yo"}
            });
        }
        //if (isMessageComponentSelectMenuInteraction(interaction))

    })

}

export { addDiscordRoutes };
