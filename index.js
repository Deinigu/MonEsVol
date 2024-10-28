const Discord = require("discord.js");
const config = require("./config.json");
const client = new Discord.Client({ intents: 3276799 });
const { loadSlash } = require("./utils/handlers/slashHandler");
require("dotenv").config();

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommands()) return;
  const cmd = client.slashCommands.get(interaction.commandName);
  if (!cmd) return;

  const args = [];
  for (let option of interaction.options.data) {
    if (option.type === 1) {
      if (option.name) args.push(option.name);
      option.options?.forEach((x) => {
        if (x.value) args.push(x.value);
      });
    } else if (option.value) args.push(option.value);
  }
  cmd.execute(client, interaction, args);
});
client.slashCommands = new Discord.Collection();

(async () => {
  await client.login(process.env.BOT_TOKEN).catch((err) => console.error(`[ERROR] Error al inciar el bot => ${err}`));
})

client.on("ready", async () => {
  await loadSlash(client)
  .then(() => {
    console.log(`[INFO] Comandos slash cargados correctamente`);
  }).catch((err) => {
    console.error(`[ERROR] Error al cargar los comandos slash => ${err}`);
  });
  console.log(`[INFO] Bot iniciado como ${client.user.tag}`);
});
