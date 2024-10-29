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
    name: "ping",
    description: "Comprueba tu latencia.",
    data: {
        name: "ping",
        description: "Comprueba tu latencia."
    },
    
    async execute(client, interaction) {
        // Calculate the ping
        let ping = Date.now() - interaction.createdTimestamp;

        // Create the embed
        const embed = new EmbedBuilder()
            .setColor(colors.primary) // Use color from JSON
            .setTitle("🍝 Pasta!")
            .setDescription(`**Ping:** ${ping} ms`)
            .setTimestamp()
            .setFooter({ text: '/ping' });

        // Reply with the embed
        await interaction.reply({ embeds: [embed] });
    }
};
