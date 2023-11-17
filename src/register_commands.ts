import { REST } from "@discordjs/rest";

import { ApplicationCommandOptionType, ApplicationCommandType, Routes } from "discord-api-types/v10";
import { discord } from "../config.json"
import { Command } from "./types/command";

const rest = new REST().setToken(discord.token);

const commands: Command[] = [
    {
        type: ApplicationCommandType.ChatInput,
        name: "ping",
        description: "hii",
        options: [
            {
                type: ApplicationCommandOptionType.Subcommand,
                name: "pong",
                description: "pong",
                options: [{
                    type: ApplicationCommandOptionType.String,
                    name: "message",
                    description: "message",
                }]
            },
        ]
    },
    {
        type: ApplicationCommandType.ChatInput,
        name: "test",
        description: "test?",
    }
];

(async () => {
    try {
        console.log("Registering Interactions")

        await rest.put(
            Routes.applicationGuildCommands(discord.clientID, discord.guildID),
            { body: commands }
        )
    } catch (e) {
        console.error("Failed to register commands", e);
    }
})();