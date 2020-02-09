exports.run = (client, message, [chan, ...args], level) => { // eslint-disable-line no-unused-vars

  chan = chan ? chan : message.channel.id;
  message.channel.send(Object.entries(client.channels.get(chan).permissionsFor(client.user.id)
    .serialize(true)).map(([p, b]) => `${b ? "+" : "-"} ${p}`).join("\n"), {code: "diff"});

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["bp"],
  permLevel: "Bot Owner",
  cooldown: 2500
};

exports.help = {
  name: "botperms",
  category: "System",
  description: "Determine the permissions of the bot.",
  usage: "botperms [channelID]"
};