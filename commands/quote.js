exports.run = async (client, message, args, level) => {
	message.delete();
	let msg, chan, guild, ref, m, c, g;
	if (/https?:\/\/discordapp.com\/channels\/\d+\/\d+\/\d+/.test(args.join(" "))) {
	  [g, c, m] = args.join(" ").split("/").splice(4, 3);
	} else {
	  [m, c, g] = args.splice(0, 3);
	}

	if (!m) return;
	guild = !g
	  ? message.guild : client.guilds.has(g)
	    ? client.guilds.get(g) : message.guild;

	chan = guild.channels.has(c)
	  ? guild.channels.get(c) : message.channel;

	ref = guild.invite ? `[${guild.name}](${guild.invite})` : guild.name;

	try {
		msg = await chan.fetchMessage(m);
		if (!msg.content) return;
		const e = {
		  "embed": {
		    "description": `**Message from** ${ref}:\n${msg.content}\n\n**[Jump to message](${msg.url})**`,
		    "color": msg.member.displayColor,
		    "timestamp": msg.createdTimestamp,
		    "footer": {
		      "icon_url": msg.guild.iconURL,
		      "text": `User ID: ${msg.author.id}`
		    },
		    "author": {
		      "name": `${msg.member.displayName} | ${msg.author.tag}`,
		      "icon_url": msg.author.displayAvatarURL
		    }
		  }
		};

		message.channel.send(e);
	}
	catch (e) {
	  message.channel.send("Message could not be found.");
	}
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["q"],
  permLevel: "Moderator",
  guilds: [],
  cooldown: 2500
};

exports.help = {
  name: "quote",
  category: "Info",
  description: "Enables sharing the contents of a referenced message neatly within an embed.",
  usage: "quote <messageURL>\n       quote <messageID> [channelID] [serverID]"
};