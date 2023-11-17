import { APIChatInputApplicationCommandInteraction, ApplicationCommandType, InteractionResponseType } from "discord-api-types/v10";
import { RunnableCommandData } from "../types/command";

const data = {
    name: 'test',
    type: ApplicationCommandType.ChatInput
} as RunnableCommandData

const execute = async (interaction: APIChatInputApplicationCommandInteraction) => {
    return {
        type: InteractionResponseType.ChannelMessageWithSource,
        data: {
            content: "tested?"
        }
    };
}

export { data, execute };

