exports.run = async (client, message, args, level) => {

  //Send message to channel and await success
  const msg = await message.channel.send("Pong!");

  //Once message is sent, edit the message to show the difference in timestamps
  msg.edit(`Pong! (${msg.createdTimestamp - message.createdTimestamp}ms)`)
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
  category: "Info",
  description: "Returns the bot latency in milliseconds.",
  usage: "ping"
};
