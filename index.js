const Discord = require("discord.js");
const client = new Discord.Client({ intents: 53608447 });
const { loadSlash } = require("./handlers/slashHandler");
require("dotenv").config();

client.slashCommands = new Discord.Collection();

client.on("interactionCreate", async (interaction) => {
  // Fix: Use .isCommand() instead of .isCommands()
  if (!interaction.isCommand()) return;
  
  const cmd = client.slashCommands.get(interaction.commandName);
  if (!cmd) return;

  const args = [];
  for (let option of interaction.options.data) {
    if (option.type === 1) { // 1 means subcommand
      if (option.name) args.push(option.name);
      option.options?.forEach((x) => {
        if (x.value) args.push(x.value);
      });
    } else if (option.value) {
      args.push(option.value);
    }
  }
  // Ensure execute function is defined on the command
  if (cmd.execute) {
    cmd.execute(client, interaction, args);
  } else {
    console.error(`[ERROR] Command ${interaction.commandName} does not have an execute function.`);
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
  
  // Load slash commands
  try {
    await loadSlash(client);
    console.log(`[INFO] Slash commands loaded successfully`);
  } catch (err) {
    console.error(`[ERROR] Error loading slash commands => ${err}`);
  }
});
