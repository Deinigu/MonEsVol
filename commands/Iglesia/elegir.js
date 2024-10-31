const { EmbedBuilder } = require("discord.js");

// Correctly require the colors JSON file
let colors;
try {
  colors = require("../../utils/json/colors.json"); // Corrected path
} catch (error) {
  console.error(`[ERROR] Could not load colors.json: ${error.message}`);
  colors = { primary: "#FFFFFF" }; // Default color if not found
}

module.exports = {
  name: "elegir",
  description: "Elige a un miembro aleatorio del servidor.",
  data: {
    name: "elegir",
    description: "Elige a un miembro aleatorio del servidor.",
  },

  async execute(client, interaction) {
    if (!interaction.guild) {
        return interaction.reply("Este comando solo se puede usar en un servidor.");
      }
    // Obtener todos los miembros del servidor
    const miembros = await interaction.guild.members.fetch();

    // Filtrar los miembros para evitar bots (opcional)
    const miembrosSinBots = miembros.filter(member => !member.user.bot);
    
    // Comprobar si hay miembros disponibles
    if (miembrosSinBots.size === 0) {
      return interaction.reply("No hay miembros disponibles para elegir.");
    }

    // Elegir un miembro aleatorio
    const miembroAleatorio = miembrosSinBots.random();

    const embed = new EmbedBuilder()
      .setTitle(`🎉 ¡He elegido a un miembro!`)
      .setDescription(`El miembro elegido es: <@${miembroAleatorio.user.id}>`)
      .setColor(colors.primary)
      .setTimestamp()
      .setFooter({ text: "/elegir" });

    await interaction.reply({
      embeds: [embed],
    });
  },
};
