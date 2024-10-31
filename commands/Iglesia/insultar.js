const { EmbedBuilder } = require("discord.js");
const funcStrings = require("../../utils/js/strings");
const funcInsultos = require("../../utils/js/insultos");

// Correctly require the colors JSON file
let colors;
try {
  colors = require("../../utils/json/colors.json"); // Corrected path
} catch (error) {
  console.error(`[ERROR] Could not load colors.json: ${error.message}`);
  colors = { primary: "#FFFFFF" }; // Default color if not found
}

module.exports = {
  name: "insultar",
  description: "Pídeme que te insulte o insulta a alguien.",
  data: {
    name: "insultar",
    description: "Pídeme que te insulte o insulta a alguien.",
    options: [
      {
        name: "usuario",
        type: 6, // Tipo STRING
        description: "¿A quién quieres insultar?",
        required: false,
      },
    ],
  },

  async execute(client, interaction) {
    const usuario = funcStrings.capitalizeFirstLetter(
      interaction.user.username
    );
    const respuesta = funcInsultos.getRandomInsulto().toLowerCase();
    const mencionado = interaction.options.getUser("usuario");

    if (mencionado) {
      const mencionadoId = mencionado.id; // Get the ID of the mentioned user
      const mencionadoNombre = funcStrings.capitalizeFirstLetter(
        mencionado.username
      );

      const embed = new EmbedBuilder()
        .addFields({
          name: `${usuario} ha insultado a ${mencionadoNombre} 🤬`,
          value: `<@${mencionadoId}>, **${respuesta}**.`,
        })
        .setColor(colors.primary)
        .setTimestamp()
        .setFooter({ text: "/insultar" });

      // Reply with the embed
      await interaction.reply({ embeds: [embed] });
      return;
    } else {
      // Handle the case where no user was mentioned
      const embed = new EmbedBuilder()
        .addFields({
          name: `${usuario} me ha pedido un insulto 🤬`,
          value: `${usuario}, **${respuesta}**.`,
        })
        .setColor(colors.primary)
        .setTimestamp()
        .setFooter({ text: "/insultar" });

      await interaction.reply({ embeds: [embed] });
    }
  },
};
