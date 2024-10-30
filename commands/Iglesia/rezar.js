const funcBendiciones = require('../../utils/js/bendiciones');
const funcImagenes = require('../../utils/js/imagenes');
const funcStrings = require('../../utils/js/strings');
const { EmbedBuilder } = require("discord.js");


// Correctly require the colors JSON file
let colors;
try {
  colors = require('../../utils/json/colors.json'); // Corrected path
} catch (error) {
  console.error(`[ERROR] Could not load colors.json: ${error.message}`);
  colors = { primary: "#FFFFFF" }; // Default color if not found
}


module.exports = {
  name: "rezar",
  description: "Reza o bendice a alguien.",
  data: {
    name: "rezar",
    description: "Reza y bendice a alguien o a ti mismo.",
    options: [
      {
        name: "usuario",
        type: 6, // Tipo USER
        description: "Menciona a un usuario para bendecir.",
        required: false
      }
    ]
  },

  async execute(client, interaction) {
    const mencionado = interaction.options.getUser("usuario");
    const bendicion = funcBendiciones.getRandomBlessing();
    const usuario = funcStrings.capitalizeFirstLetter(interaction.user.username)


    if (!mencionado) {
      // Rezar solo
      const img = funcImagenes.getImageSolo();


      const embed = new EmbedBuilder()
        .setColor(colors.primary) // Use color from JSON
        .setTitle(`🍝 ¡Ramén!`)
        .addFields(
          { name: `Gracias por rezar, ${usuario}.`, value: bendicion }
        )
        .setImage(img)
        .setTimestamp()
        .setFooter({ text: '/rezar' });
      await interaction.reply({
        embeds: [embed],
      });
    } else {
      // Bendecido a alguien
      const img = funcImagenes.getImageCoop();

      const bendecido = funcStrings.capitalizeFirstLetter(mencionado.username)


      const embed = new EmbedBuilder()
        .setColor(colors.primary) // Use color from JSON
        .setTitle(`🍝 ¡Ramén!`)
        .addFields(

          { name: `**${bendecido}** ha sido bendecide gracias a **${usuario}**`, value: bendicion }
        )
        .setImage(img)
        .setTimestamp()
        .setFooter({ text: '/rezar' });
      await interaction.reply({
        embeds: [embed]
      });
    }

  }
};
