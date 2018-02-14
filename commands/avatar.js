exports.run = (client, message, args, level) => {

	if (!args[0]) {

		message.channel.send(message.author.avatarURL);	

	} else if (message.mentions.users.array().length <= 3) {
		const users = message.mentions.users;
		users.forEach( u => {
			message.channel.send(u.avatarURL);
		});
	} else {
		message.channel.send("Too many arguments provided. Please use no more than 3 mentions.");
	}

};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ["ava"],
	permLevel: "User",
	guilds: [],
	cooldown: 2500
};

exports.help = {
	name: "avatar",
	category: "Info",
	description: "Returns the user's avatar if no argument provided; returns up to 3 mentioned users' avatars with args.",
	usage: "avatar [user(s)]"
};
