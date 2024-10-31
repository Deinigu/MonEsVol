const { EmbedBuilder } = require("discord.js");

let colors;
try {
  colors = require("../../utils/json/colors.json"); // Corrected path
} catch (error) {
  console.error(`[ERROR] Could not load colors.json: ${error.message}`);
  colors = { primary: "#FFFFFF" }; // Default color if not found
}

module.exports = {
  name: "evangelio",
  description: "Enlace al Evangelio del Monstruo de Espagueti en PDF gratuito.",
  data: {
    name: "evangelio",
    description:
      "Enlace al Evangelio del Monstruo de Espagueti en PDF gratuito.",
  },

  async execute(client, interaction) {
    const embed = new EmbedBuilder()
      .setTitle("📖 Evangelio del Monstruo de Espagueti Volador")
      .setDescription(
        `En el siguiente enlace tienes mi libro en PDF entero. Totalmente gratuito (somos unos piratas, recuérdalo 🦜🏴‍☠️).\n\n` +
        `[Descargar el Evangelio 🍝](https://www.pastafarismo.es/libro/El%20Evangelio%20del%20Monstruo%20de%20Espagueti.pdf)`
      )
      .setColor(colors.primary)
      .setTimestamp()
      .setFooter({ text: "/evangelio" });

    await interaction.reply({
      embeds: [embed],
    });
  },
};
