exports.run = (client, message, args, level) => {
	const pollQ = `${args.join(" ").split("?", 1)[0]}?`;
	const pollOpts = `${args.join(" ").split("?")[1]}`;
	if (!message.content.includes("?")) return message.channel.send(`Please submit a valid question. Questions should end with \`?\``);
	message.channel.send(pollQ);
	message.channel.send(pollOpts);
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [],
	permLevel: "Bot Admin",
	guilds: [],
	cooldown: 5000
};

exports.help = {
	name: "poll",
	category: "Community",
	description: "Create a poll for users to participate in voting. Seperate options with spaces.",
	usage: "poll <question> <option a> <option b> [further options]"
};
