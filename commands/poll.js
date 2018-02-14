exports.run = (client, message, orgs, level) => {

};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [],
	permLevel: "Moderator",
	guilds: [],
	cooldown: 5000
};

exports.help = {
	name: "poll",
	category: "Community",
	description: "Create a poll for users to participate in voting. Seperate options with spaces.",
	usage: "poll <option> <options> [option(s)]"
};