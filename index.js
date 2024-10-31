const Discord = require("discord.js");
const { loadSlash } = require("./handlers/slashHandler");
require("dotenv").config();

const client = new Discord.Client({ intents: 3276799 });
client.slashCommands = new Discord.Collection();

// Manejar interacciones de comandos
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const cmd = client.slashCommands.get(interaction.commandName);
  if (!cmd) return;

  try {
    await cmd.execute(client, interaction);
  } catch (error) {
    console.error(`[ERROR] Error ejecutando el comando ${interaction.commandName}:`, error);
    await interaction.reply({ content: 'Hubo un error al ejecutar este comando.', ephemeral: true });
  }
});

(async () => {
  try {
    await client.login(process.env.BOT_TOKEN);
    console.log(`[INFO] Logging in...`);
  } catch (err) {
    console.error(`[ERROR] Error logging in the bot => ${err}`);
  }
})();

client.on("ready", async () => {
  console.log(`[INFO] Bot started as ${client.user.tag}`);

  // Cargar los comandos slash
  try {
    await loadSlash(client);
    console.log(`[INFO] Slash commands loaded successfully`);
  } catch (err) {
    console.error(`[ERROR] Error loading slash commands => ${err}`);
  }
});
