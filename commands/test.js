exports.run = (client, message, args, level) => {
  const test = {
    "description": "test"
  };
  const x = client.channels.get('412093571483828225');
  message.channel.send(x.toString());
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Bot Owner",
  guilds: [],
  cooldown: 2500
};

exports.help = {
  name: "test",
  category: "System",
  description: "This is a test command.",
  usage: "test"
};
