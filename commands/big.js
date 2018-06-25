exports.run = (client, message, args, level) => {

	//Use guild-specific settings if used in guild or default settings otherwise
	const settings = message.guild
        	? client.settings.get(message.guild.id)
                : client.config.defaultSettings;

	//Join all text to big-ify together and split into individual characters
	let msg = args.join(" ").toLowerCase().split(""), end = "";

	//Define character arrays
	const alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
	const emojibet = ['🇦', '🇧', '🇨', '🇩', '🇪', '🇫', '🇬', '🇭', '🇮', '🇯', '🇰', '🇱', '🇲', '🇳', '🇴', '🇵', '🇶', '🇷', '🇸', '🇹', '🇺', '🇻', '🇼', '🇽', '🇾', '🇿'];
	const numbet = ['0','1','2','3','4','5','6','7','8','9'];
	const emobet = [':zero:',':one:',':two:',':three:',':four:',':five:',':six:',':seven:',':eight:',':nine:'];

	//If no text is supplied, return message
	if (!args[0]) return message.channel.send("Please specify a string to enlarge.");

	//Delete invoking message sent by user if in guild
	if (message.guild) message.delete();

	//Check each character for action
	for (i = 0; i < msg.length; i++) {

		//If the character is a letter, replace it with the corresponding emoji
		if (alphabet.includes(msg[i])) {

			//Determine character position in array
			const x = alphabet.indexOf(msg[i]);

			//Replace letter with emoji and space to escape flag emojis on some devices
			end += `${emojibet[x]} `;
		}

		//If the character is a number, replace it with the corresponding emoji
		else if (numbet.includes(msg[i])) {

			//Determine character position in array
			const x = numbet.indexOf(msg[i]);

			//Replace number with emoji
			end += `${emobet[x]} `;
		}

		//If character is a space, add a few for scale
		else if (msg[i] == " ") {
			end += "    ";
		}

		//Otherwise, send the charcter as-is
		else end += msg[i];
	}

	//Send formatted message to channel
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
