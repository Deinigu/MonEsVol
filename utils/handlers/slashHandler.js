const { readdirSync } = require("fs");

module.exports = {
  async loadSlash(client) {
    const slashFiles = readdirSync("./slashCommands").filter((file) =>
      file.endsWith(".js")
    );
    for (const file of slashFiles) {
      const command = require(`../slashCommands/${file}`);
      client.slashCommands.set(command.data.name, command);
      await client.guilds.cache
        .get("ID_GUILD")
        .commands.create(command.data)
        .catch((err) =>
          console.error(
            `[ERROR] Error al cargar el comando slash ${command.data.name} => ${err}`
          )
        );
    }
  },
};
