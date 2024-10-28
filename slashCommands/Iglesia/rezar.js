const { AttachmentBuilder } = require("discord.js");
const imagenes = require('../../utils/json/imagenes.json');
const imagenessolos = require('../../utils/json/imagenesSolos.json');

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
    const img_al = Math.floor(Math.random() * imagenes.length);
    const img = new AttachmentBuilder(imagenes[img_al]);

    if (!mencionado) {
      const img_al2 = Math.floor(Math.random() * imagenessolos.length);
      const img2 = new AttachmentBuilder(imagenessolos[img_al2]);
      await interaction.reply({
        content: `Has sido bendecido por mí, humano. Disfruta tu bendición`,
        files: [img2]
      });
    } else {
      await interaction.reply({
        content: `${mencionado.username} ha sido bendecido gracias a ${interaction.user.username}`,
        files: [img]
      });
    }
  }
};
