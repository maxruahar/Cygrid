const { inspect } = require("util");

exports.run = (client, message, args, level) => {
	if (!args[0]) return message.channel.send(`Please submit a valid question. Questions should end with \`?\``);
	if (!message.content.includes("?")) return message.channel.send(`Please submit a valid question. Questions should end with \`?\``);
	const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
	const pQ = `${args.join(" ").split("?", 1)[0]}?`;
	const pOpts = (message.content.split("?")[1]).substr(1).split("  ");
	let pResponse = "";
	let pEmbed = {};
	let i = 0;

	pOpts.forEach(o => {
		pResponse += `:regional_indicator_${alphabet[i]}: ‣ ${o}\n`;
		i++;
	});

	pEmbed.title = pQ;
	pEmbed.description = pResponse;
	pEmbed.footer = {"icon_url": message.guild.iconURL, "text": message.guild.name};
	pEmbed.timestamp = new Date();

	message.channel.send("", {embed: pEmbed});
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [],
	permLevel: "User",
	guilds: [],
	cooldown: 1000
};

exports.help = {
	name: "poll",
	category: "Community",
	description: "Create a poll for users to participate in voting. Seperate options with spaces.",
	usage: "poll <question> <option a> <option b> [further options]"
};
