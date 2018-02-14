exports.run = (client, message, args, level) => {

};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: "Administrator",
	guilds: [],
	cooldown: 1000
};

exports.help = {
	name: "nick",
	category: "Administration",
	description: "Change a users nickname.",
	usage: "nick <user> <nickname>"
};