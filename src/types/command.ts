import { APIApplicationCommandOption, APIChatInputApplicationCommandInteraction, APIInteractionResponseChannelMessageWithSource, ApplicationCommandType } from "discord-api-types/v10";

type Command = {
    type: ApplicationCommandType;
    name: string;
    description?: string;
    options?: APIApplicationCommandOption[];
}

type RunnableCommand = {
    data: RunnableCommandData,
    execute: (interaction: APIChatInputApplicationCommandInteraction) => Promise<APIInteractionResponseChannelMessageWithSource>;
}

type RunnableCommandData = {
    name?: string;
    type: ApplicationCommandType;
}

export type { Command, RunnableCommand, RunnableCommandData };
