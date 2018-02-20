exports.run = (client, message, args, level) => {
	if (!args[0]) return message.channel.send(`Please submit a valid question. Questions should end with \`?\``);
	if (!message.content.includes("?")) return message.channel.send(`Please submit a valid question. Questions should end with \`?\``);
	//use similar alphabet array to big.js to auto-populate regional indicator emoji prepended to each poll option
	const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
	const pollQ = `${args.join(" ").split("?", 1)[0]}?`;
	const pollOpts = args.join(" ").split("?")[1].split(", ");
	const pollResponse = "";

	pollResponse += `**${pollQ}**\n`;
	
	message.channel.send(pollQ);
	message.channel.send(pollOpts);
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [],
	permLevel: "Bot Admin",
	guilds: [],
	cooldown: 1000
};

exports.help = {
	name: "poll",
	category: "Community",
	description: "Create a poll for users to participate in voting. Seperate options with spaces.",
	usage: "poll <question> <option a> <option b> [further options]"
};
