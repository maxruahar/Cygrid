exports.run = (client, message, args, level) => {

	const [num, min, max] = args;
	if (isNaN(num) || isNaN(min) || isNaN(max)) return message.channel.send("Please provide a valid number for each argument.")
	const s = num > 1 ? "numbers" : "number"
	if (!num) return message.channel.send('Please specify the number of rolls to make.');
	if (num < 1) return message.channel.send('Minimum number of rolls not met. Please roll between **1** and **50** numbers.');
	if (num > 50) return message.channel.send('Maximum number of rolls exceeded. Please roll between **1** and **50** numbers.');
	if (!min) return message.channel.send('Please specify a minimum value.');
	if (!max) return message.channel.send('Please specify a maximum value.');
	let output = "**Here are your results!**\n\n"
	function result (min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + Number(min);
	}
	let i = 0;
	const list = () => {
		const x = result(min, max);
		output += `• ${x}\n`;
		i++;
		if (i < num) {
			list();
		}
	}
	list();

	const rEmbed = {
		"embed": {
			"author": {
				"name": `You rolled ${num} ${s} between ${min} and ${max}`
			},
			"description": output,
			"color": 12648485,
			"timestamp": new Date(),
		}
	}

	const fs = message.guild
		? rEmbed.embed.footer = { "icon_url": message.guild.iconURL, "text": message.guild.name }
		: rEmbed.embed.footer = { "icon_url": message.author.avatarURL, "text": message.author.username }

	message.channel.send('', rEmbed);
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
  name: "roll",
  category: "Fun",
  description: "Roll **x** amount of numbers between **y** and **z**. **x** must be less than or equal to 50.",
  usage: "roll <number of rolls> <minimum value> <maximum value>"
};
