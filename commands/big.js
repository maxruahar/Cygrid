exports.run = (client, message, args, level) => {
	let msg = args.join(" ").split(""), end = "";
	let alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
	if (!args[0]) return message.channel.send("Please specify a string to enlarge.");
	if (msg.length > 90) return message.channel.send("The specified string is too long. There is currently a 90 character limit.");
	message.delete();
	for (i = 0; i < msg.length; i++) {
	if (alphabet.includes(msg[i].toLowerCase())) {
		end += ":regional_indicator_" + msg[i].toLowerCase() + ":";
	} else if (msg[i] == " ") {
		end += msg[i] + msg[i] + msg[i];
	} else end += msg[i];
	}
message.channel.send(end);
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: "User",
	guilds: [],
	cooldown: 2500
};

exports.help = {
	name: "big",
	category: "Fun",
	description: "Big if true.",
	usage: "big <message>"
};
