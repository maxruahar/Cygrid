const { inspect } = require("util");

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars

	const settings = client.settings.get(message.guild.id);

	if (!args[0]) {

		message.channel.send("Please enter one or more users to unmute.");

	} else {

		const settings = client.settings.get(message.guild.id);
		const users = message.mentions.users;
		let list = settings.muteList;
		let tags = [];
		users.forEach( u => {


			if (!list.includes(u.id)) {
				message.channel.send(`${u.tag} is not muted.`);
				return;
			}


			list = list.filter(e => e !== u.id);
			tags.push(u.tag);


		});
		settings["muteList"] = list;
		client.settings.set(message.guild.id, settings);
		if (tags.length !== 0) {
			message.channel.send(`Unmuted ` + tags.join(", ") + ".");
			client.channels.find("id", settings.logChannel).send(`${message.author.tag} unmuted ` + tags.join(", "));
		}


	}

};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [],
	permLevel: "Administrator",
	guilds: [],
	cooldown: 1500
};

exports.help = {
	name: "unmute",
	category: "Moderation",
	description: "Unmutes specified user(s).",
	usage: "unmute <user1> [user2] [user3]"
};
