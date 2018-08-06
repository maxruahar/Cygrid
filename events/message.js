// The MESSAGE event runs anytime a message is received
// Note that due to the binding of client to every event, every event
// goes `client, other, args` when this function is run.
const { inspect } = require("util");

module.exports = (client, message) => {
	const settings = (message.guild)
		? client.settings.get(message.guild.id)
		: client.config.defaultSettings;
	if (message.guild) message.url = `https://discordapp.com/channels/${message.guild.id}/${message.channel.id}/${message.id}`;
	const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
	const gex = client.config.gex;
	const jmod = client.config.jmod;
	const jlog = ["424254117767282709", "440528752561225729", "424254313448079362", "428220727154442242", "469800165113331713", "474574393159188491", "473830893568524288"];

	if (message.author.bot) return;
	if (message.member == "null") return;
	if (message.guild) {
		if (message.guild.id  == "303835144073248770"
		&& jlog.includes(message.channel.parentID)
		&& message.channel.id !== "432897130408050692"
//		&& Object.keys(jmod).includes(message.author.id)) {
		&& message.member.roles.has("303835235290972160")) {
			const embed = {};
			embed.author = {"name": jmod[message.author.id], "icon_url": message.author.avatarURL};
			embed.description = `**New message in <#${message.channel.id}>**:\n${message.content}`;
			embed.color = "16776960";
//			embed.fields = [{"name": "Content", "value": message.content}];
			embed.footer = {"icon_url": "https://i.imgur.com/xIKUTMP.png", "text": message.channel.name};
			embed.timestamp = new Date();
//			const chan = client.channels.get('398676006325452801');
			const chan = client.channels.get('432897130408050692');
			chan.send("", {embed: embed});
		}
	}

	if (client.ignoredUsers.has(message.author.id)) return message.delete();

	if (settings.muteList.includes(message.author.id)) {
		message.delete();
		const muteLog = client.channels.find("id", settings.logChannel);
		muteLog.send(message.author.tag + ": `" + message.content + "`" + " deleted in " + message.channel.toString());
	}

	if (settings.spamFilter == "true") {
		if (message.content.toLowerCase().indexOf("wwwwwwwwww") > -1) message.delete();
		let last = "";
		let output = "";
		let check = "false";
		let msg = message.content;
	        let x = message.content.match(/<@!?\d+>/g);
	        const users = [];
		const mens = [];
	        const ids = [];
	        let i = 0, j = 0;
		message.mentions.users.forEach(m => {
			if (Object.keys(gex).includes(m.id) && !Object.keys(jmod).includes(message.author.id)) check = "true";
		});
		if (check == "true") {
			x.forEach(o => {
				let raw = o.replace(/<@/g, "").replace(/>/g, "");
				let id = raw.indexOf("!") > -1 ? raw.replace("!", "") : raw;
				if (Object.keys(gex).includes(id)) {
					users.push(`@${gex[id]}`);
					mens.push(`${gex[id]}`);
				} else {
					users.push(`@${client.users.get(id).username}`);
				}
				ids.push(raw);
				i++;
			});
			users.forEach(u => {
				msg = msg.replace(`<@${ids[j]}>`, users[j]);
				j++;
			});
		}
//	        message.channel.send("body:\n" + y);


//		message.mentions.users.forEach(m => {
//			if (Object.keys(gex).includes(m.id) && m.id !== client.config.ownerID) check = "true";
//			men.push(gex[m.id]);
//			msg = msg.replace(/<@!?\d+>/g, `@${m.username}`);
//		});
//		message.channel.send(`${men}`);
		if (check == "true") {
			if (mens.length == 1) {
				output = mens[0];
			message.reply(`Thanks for tagging **${output}**! Please be aware that we are not always able to respond to your questions and messages.`);
			} else {
				last = mens.pop();
				output = mens.join("**, **");
				if (mens.length == 1) {
					message.reply(`Thanks for tagging **${output}** and **${last}**! Please be aware that we are not always able to respond to your questions and messages.`);
				} else {
					message.reply(`Thanks for tagging **${output}**, and **${last}**! Please be aware that we are not always able to respond to your questions and messages.`);
				}
			}
		}
	}

	if (message.guild) {
		if (message.guild.id == "303835144073248770" && message.author.id !== "97928972305707008") return; //Official Runescape Discord server
		if (message.guild.id == "427813578674798592" && message.author.id !== "97928972305707008") return; //Official Farming Discord server
		if (message.guild.id == "324132423636090880" && message.author.id !== "97928972305707008") return; //Official OSRS Discord server
	}

	if (message.content.toLowerCase().includes("prefix") && message.content.includes("<@398315492877533186>")) return message.channel.send(`The prefix in this server is set to **${settings.prefix}**`);
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

	if (cmd && !message.guild && cmd.conf.guildOnly)
		return message.channel.send(`**${cmd.help.name}** is not usable through PM. Please run it in a guild.`);

	if (cmd && !cmd.conf.enabled) return message.channel.send(`**${cmd.help.name}** is currently disabled.`);

	if (cmd && message.guild && cmd.conf.guilds.length > 0 && !guilds.includes(message.guild.id)) {
		return message.channel.send(`**${cmd.help.name}** cannot be used on this server.`);
	} else if (cmd && !message.guild && cmd.conf.guilds.length > 0) {
		return message.channel.send(`**${cmd.help.name}** is not usable through PM.`);
	}

	if (cmd && message.guild && !settings.enabledCommands.includes(cmd.help.name)) {
	 	return message.channel.send(`**${cmd.help.name}** is not enabled on this server.`);
	}

	if (level < client.levelCache[cmd.conf.permLevel]) {
		if (settings.systemNotice === "true") {
			return message.channel.send(`You do not have permission to use **${cmd.help.name}.**`);
		} else {
			return;
		}
	}

	if (cmdCD.has(message.author.id)) {
		ignoredUsers.add(message.author.id);
		setTimeout(() => {
			ignoredUsers.delete(message.author.id);
		}, cmd.conf.cooldown);
		return  message.channel.send(`Please wait, **${cmd.help.name}** is currently on cooldown. **(${cmd.conf.cooldown/1000}s)**`);}
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
