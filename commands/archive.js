exports.run = (client, message, args, level) => {
	
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ["ar"],
	permLevel: "Server Owner",
	guilds: [],
	cooldown: 5000
};

exports.help = {
	name: "archive",
	category: "Administration",
	description: "Archive an existing channel. Optionally create a new version and add specified users to channel.",
	usage: "archive <channel> <new name> [new user(s)]"
};