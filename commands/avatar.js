exports.run = (client, message, args, level) => {

	//Use guild-specific settings if used in guild or default settings otherwise
	const settings = message.guild
		? client.settings.get(message.guild.id)
		: client.config.defaultSettings;

	//If no message is provided, return user avatar
	if (!args[0]) {
		return message.channel.send(message.author.avatarURL);
	}

	//If there are between 1 and 3 mentions return users' avatars
	else if (message.mentions.users.array().length > 0 && message.mentions.users.array().length <= 3) {
		const users = message.mentions.users;
		users.forEach(u => message.channel.send(u.avatarURL));
	}

	//Otherwise, return generic error message and prompt user to use help command
	else {
		message.channel.send(`Incorrect arguments provided. Please use **${settings.prefix}help avatar** for more information.`);
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
