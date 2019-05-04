module.exports = async (client, guild) => {
  client.guilds.get("433447855127003157").channels.get("574052290755821588").send(`**${guild.id}:** Cygrid has been removed from **${guild.name}**.`);
};