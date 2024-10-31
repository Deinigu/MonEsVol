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
        // Initialize ping to WebSocket ping or fallback if it's -1
        let ping = client.ws.ping !== -1 ? client.ws.ping : Date.now() - interaction.createdTimestamp;

        // Create the embed
        const embed = new EmbedBuilder()
            .setColor(colors.primary)
            .setTitle("🍝 Pasta!")
            .setDescription(`**Ping:** ${ping} ms`)
            .setTimestamp()
            .setFooter({ text: '/ping' });

        // Reply with the embed
        await interaction.reply({ embeds: [embed] });
    }

};
