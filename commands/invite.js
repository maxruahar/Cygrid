exports.run = async (client, message, args, level) => {

  if (!args[0] && message.guild.invite) return message.channel.send(message.guild.invite);
  if (Number(args[0]) && client.guilds.has(args[0])) {
    return message.channel.send(client.guilds.get(args[0]).invite);
  } else if (client.guilds.map(g => g.name.toLowerCase()).includes(args.join(" ").toLowerCase())) {
    return message.channel.send(client.guilds.find("name", args.join(" ")).invite);
  }

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["inv"],
  permLevel: "Bot Admin",
  guilds: [],
  cooldown: 5000
};

exports.help = {
  name: "invite",
  category: "Info",
  description: "Fetch an invite for the server.",
  usage: "invite [guildID]"
};
