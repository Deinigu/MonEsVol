const { EmbedBuilder } = require("discord.js");

let colors;
try {
  colors = require("../../utils/json/colors.json"); // Corrected path
} catch (error) {
  console.error(`[ERROR] Could not load colors.json: ${error.message}`);
  colors = { primary: "#FFFFFF" }; // Default color if not found
}

module.exports = {
  name: "help",
  description: "Muestra todos los comandos disponibles.",
  data: {
    name: "help",
    description: "Muestra todos los comandos disponibles.",
  },

  async execute(client, interaction) {
    const embed = new EmbedBuilder()
      .setTitle("📚 Comandos disponibles")
      .setColor(colors.primary) // Color azul
      .setFooter({ text: "/help" })
      .setTimestamp();

    // Itera sobre todos los comandos cargados y agrega cada uno al embed
    client.slashCommands.forEach(command => {
      embed.addFields({
        name: `/${command.name}`,
        value: command.description,
      });
    });

    // Responde a la interacción con el embed
    await interaction.reply({
      embeds: [embed],
    });
  },
};
