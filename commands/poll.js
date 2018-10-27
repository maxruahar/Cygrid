const { inspect } = require("util");

exports.run = (client, message, args, level) => {
	if (!args[0] || !message.content.includes("?")) return message.channel.send(`Please submit a valid question. Questions should end with \`?\``);
	const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
	const emojibet = ["🇦", "🇧", "🇨", "🇩", "🇪", "🇫", "🇬", "🇭", "🇮", "🇯", "🇰", "🇱", "🇲", "🇳", "🇴", "🇵", "🇶", "🇷", "🇸", "🇹", "🇺", "🇻", "🇼", "🇽", "🇾", "🇿"];
	const pQ = `${args.join(" ").split("?", 1)[0]}?`;
	const pOpts = (message.content.split("?")[1]).substr(1).split("  ");
	if (pOpts > 20) return message.channel.send("Please supply 20 or less possible answers. This is a limit set in place by Discord on the number of reactions that a message can have.");
	let pResponse = "";
	let pEmbed = {};
	let i = 0;
	message.delete();

	pOpts.forEach(o => {
//		pResponse += `:regional_indicator_${alphabet[i]}: ‣ ${o}\n`;
		pResponse += `${emojibet[i]}: ‣ ${o}\n`;
		i++;
	});

	i = 0;
	pEmbed.title = pQ;
	pEmbed.description = pResponse;
	pEmbed.footer = {"icon_url": message.guild.iconURL, "text": message.guild.name};
	pEmbed.timestamp = new Date();

	message.channel.send("", {embed: pEmbed})
	.then((message) => {
		let o = 0, x = pOpts.length;
		function react() {
			message.react(emojibet[o]);
			o++;
			if (o < x) {
				setTimeout(react, 500);
			}
		}
		react();
	});
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [],
	permLevel: "User",
	guilds: [],
	cooldown: 1000
};

exports.help = {
	name: "poll",
	category: "Community",
	description: "Create a poll for users to participate in voting. Seperate options with double spaces.",
	usage: "poll <question> <option a>  <option b>  [further options]"
};
