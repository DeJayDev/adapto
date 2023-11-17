import { APIChatInputApplicationCommandInteraction, ApplicationCommandType, InteractionResponseType } from "discord-api-types/v10";
import { RunnableCommandData } from "../../types/command";

const data = {
    type: ApplicationCommandType.ChatInput
} as RunnableCommandData

const execute = async (interaction: APIChatInputApplicationCommandInteraction) => {
    return {
        type: InteractionResponseType.ChannelMessageWithSource,
        data: {
            content: "ping pong!"
        }
    };
}

export { data, execute };

