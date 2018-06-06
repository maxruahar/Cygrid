exports.run = async (client, message, args, level) => {
  const msg = await message.channel.send("Pong!");
  msg.edit(`Pong! (${m.createdTimestamp - message.createdTimestemp}ms)`)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User",
  guilds: [],
  cooldown: 2500
};

exports.help = {
  name: "ping",
  category: "System",
  description: "Returns the bot latency in milliseconds.",
  usage: "ping"
};
