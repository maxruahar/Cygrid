exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars

	//Define code var
	const code = args.join(" ");

	try {
		//Evaluate Javascript following the eval command
		const evaled = eval(code);

		//Replace bot token and escape code blocks and mentions
		const clean = await client.clean(client, evaled);

		//Send cleaned response to the channel
		message.channel.send(`\`\`\`js\n${clean}\n\`\`\``);

	} catch (err) {
		//If an error occurs, send it to the channel
		message.channel.send(`\`ERROR\`\n\`\`\`${await client.clean(client, err)}\`\`\``);
	}

};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ["e"],
	permLevel: "Bot Admin",
	guilds: [],
	cooldown: 1000
};

exports.help = {
	name: "eval",
	category: "System",
	description: "Evaluates arbitrary Javascript.",
	usage: "eval <code>"
};
