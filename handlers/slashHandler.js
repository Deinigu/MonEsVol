const { readdirSync } = require("fs");

module.exports = {
	async loadSlash(client) {
		// Iterate through each category in the slashCommands directory
		for (const category of readdirSync("./slashCommands")) {
			// Make sure the path is correct and read the files in each category
			const commandFiles = readdirSync(`./slashCommands/${category}`).filter(file => file.endsWith(".js"));

			// Iterate through each command file
			for (const fileName of commandFiles) {
				const command = require(`../slashCommands/${category}/${fileName}`);
				client.slashCommands.set(command.name, command);
			}
		}

		// Set the slash commands in the Discord application
		await client.application?.commands.set(client.slashCommands.map(command => command.data));
	},
};

