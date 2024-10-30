const { EmbedBuilder } = require("discord.js");
const funcStrings = require("../../utils/js/strings");
const funcRespuestas = require("../../utils/js/respuestas");

// Correctly require the colors JSON file
let colors;
try {
  colors = require("../../utils/json/colors.json"); // Corrected path
} catch (error) {
  console.error(`[ERROR] Could not load colors.json: ${error.message}`);
  colors = { primary: "#FFFFFF" }; // Default color if not found
}

module.exports = {
  name: "preguntar",
  description: "Hazme una pregunta de sí o no.",
  data: {
    name: "preguntar",
    description: "Hazme una pregunta de sí o no.",
    options: [
      {
        name: "pregunta",
        type: 3, // Tipo STRING
        description: "Especifica tu pregunta.",
        required: true,
      },
    ],
  },

  async execute(client, interaction) {
    const usuario = funcStrings.capitalizeFirstLetter(
      interaction.user.username
    );
    const pregunta = interaction.options.getString("pregunta").toLowerCase();
    const respuesta = funcRespuestas.getRandomRespuesta();
    const embed = new EmbedBuilder()
      .setTitle(`🔮 ${usuario} ha preguntado: **${pregunta}**`)
      .addFields({ name: `🍝 Mi respuesta es: `, value: `${respuesta}` })
      .setColor(colors.primary)
      .setTimestamp()
      .setFooter({ text: "/preguntar" });
    await interaction.reply({
      embeds: [embed],
    });
  },
};
