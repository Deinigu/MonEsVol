const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "ping",
    description: "Comando de ping",
    
    async execute(client, interaction) {
        let ping = Date.now() - interaction.createdTimestamp;

        const embed = new EmbedBuilder()
            .setColor("Red") // Color en mayúsculas
            .setDescription(`Ping => ${ping} ms`); // Mensaje con la latencia
        
        await interaction.reply({ embeds: [embed] }); // Responder adecuadamente
    }
};
