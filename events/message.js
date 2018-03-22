// The MESSAGE event runs anytime a message is received
// Note that due to the binding of client to every event, every event
// goes `client, other, args` when this function is run.

module.exports = (client, message) => {
	const settings = message.guild
		? client.settings.get(message.guild.id)
		: client.config.defaultSettings;
	const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

	if (message.author.bot) return;
	if (client.ignoredUsers.has(message.author.id)) return message.delete();
	if (message.guild.id == "303835144073248770" && message.author !== "97928972305707008") return;

	if (settings.muteList.includes(message.author.id)) {
		message.delete();
		const muteLog = client.channels.find("id", settings.logChannel);
		muteLog.send(message.author.tag + ": `" + message.content + "`" + " deleted in " + message.channel.toString());
	}

	if (settings.spamFilter == "true") {
		if (message.content.toLowerCase().indexOf("wwww") > -1) message.delete();
		const gex = client.config.gex;
		let last = "";
		let output = "";
		let men = [];
		let check = "false";
		let msg = message.content;

		message.mentions.users.forEach(m => {
			if (Object.keys(gex).includes(m.id)) check = "true";
			men.push(gex[m.id]);
			msg = msg.replace(/<@!?\d+>/g, `@${m.username}`);
		});
		if (check == "true") {
			if (men.length == 1) {
				output = men[0];
			message.reply(`You do not have permission to mention **${output}**:\n${msg}`);
			} else {
				last = men.pop();
				output = men.join("**, **");
				if (men.length == 1) {
					message.reply(`You do not have permission to mention **${output}** and **${last}**:\n${msg}`);
				} else {
					message.reply(`You do not have permission to mention **${output}**, and **${last}**:\n${msg}`);
				}
			}
			return message.delete();
		}
	}


	if (message.content.indexOf(settings.prefix) !== 0) return;

	message.settings = settings;
	const cmdstr = message.content.slice(settings.prefix.length);
	const args = message.content.slice(settings.prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();
	const level = client.permlevel(message);
	const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
	if (!cmd) return;
	const guilds = cmd.conf.guilds;
	const cmdCD = client.cmdCD;
	const ignoredUsers = client.ignoredUsers;

	if (cmd && cmd.conf.guilds.length > 0 && !guilds.includes(message.guild.id))
		return message.channel.send(`\`${cmd.help.name}\` cannot be used on this server.`);

	if (cmd && !settings.enabledCommands.includes(cmd.help.name))
	 	return message.channel.send(`\`${cmd.help.name}\` is not enabled on this server.`);

	if (cmd && !message.guild && cmd.conf.guildOnly)
		return message.channel.send(`\`${cmd.help.name}\` is not usable through PM. Please run it in a guild.`);

	if (level < client.levelCache[cmd.conf.permLevel]) {
		if (settings.systemNotice === "true") {
			return message.channel.send(`You do not have permission to use \`${cmd.help.name}.\``);
		} else {
			return;
		}
	}

	if (cmdCD.has(message.author.id)) {
		ignoredUsers.add(message.author.id);
		setTimeout(() => {
			ignoredUsers.delete(message.author.id);
		}, cmd.conf.cooldown);
		return  message.channel.send(`Please wait, \`${cmd.help.name}\` is currently on cooldown. **(${cmd.conf.cooldown/1000}s)**`);}
	cmdCD.add(message.author.id);
	setTimeout(() => {
		cmdCD.delete(message.author.id);
	}, cmd.conf.cooldown);

	message.author.permLevel = level;

	message.flags = [];
	while (args[0] && args [0][0] === "-") {
		message.flags.push(args.shift().slice(1));
	}

	console.log(`CMD: ${client.config.permLevels.find(l => l.level === level).name} ${message.author.username} (${message.author.id}) ran command ${cmdstr}`);
	cmd.run(client, message, args, level);

};
