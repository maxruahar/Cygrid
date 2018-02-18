exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
	await message.channel.send("Shutting down.");
	client.rebootChannel = message.channel.id;
	client.commands.forEach(async cmd => {
		await client.unloadCommand(cmd);
	});
	process.exit(1);
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ["rb"],
	permLevel: "Bot Admin",
	guilds: [],
	cooldown: 5000
};

exports.help = {
	name: "reboot",
	category: "System",
	description: "Shuts down the bot. Will attempt to automatically restart.",
	usage: "reboot"
};
