const { inspect } = require("util");

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars

	const settings = client.settings.get(message.guild.id);

	if (!args[0]) {

		message.channel.send("Please enter one or more users to mute.");

	} else {

		const settings = client.settings.get(message.guild.id);
		const list = settings.muteList;
		const tags = [];
		const users = message.mentions.users;

		users.forEach(u => {
			if (list.includes(u.id)) {
				return message.channel.send(`${u.tag} is already muted.`);
			} else {
				list.push(u.id);
				tags.push(u.tag);
			}
		});

		settings["muteList"] = list;
		client.settings.set(message.guild.id, settings);
		if (tags.length !== 0) {
			message.channel.send(`Muted ` + tags.join(", ") + ".");
			client.channels.find("id", settings.logChannel).send(`${message.author.tag} muted ` + tags.join(", "));
		}

	}

};

exports.conf = {
	enabled:true,
	guildOnly: true,
	aliases: [],
	permLevel: "Administrator",
	guilds: []
};

exports.help = {
	name: "mute",
	category: "Moderation",
	description: "Mutes specified user(s).",
	usage: "mute [user1] {user2} {user3}"
};