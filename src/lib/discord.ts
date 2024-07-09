import { Client, GatewayIntentBits } from 'discord.js';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
  ],
});

export const setup = () => {
  client.login(import.meta.env.VITE_DISCORD_TOKEN);
}

client.once('ready', () => {
  console.log('Ready!');
});

client.on("messageCreate", (message: Message) => {
  if (message.content === "!ping") {
    message.reply("Pong!");
  }
});
