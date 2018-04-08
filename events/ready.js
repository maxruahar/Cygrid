module.exports = async client => {

/*	const request = require('request');
	const name = "runescape";
	let stream, diff;
	const options = {
		url: `https://api.twitch.tv/kraken/streams/${name}`,
		headers: {
			'Client-ID': 'vyxo0jjtz4zpjr3tc6k122qlz8iaxd'
		}
	};
	const callback (error, response, body) =>  {
		if (stream == "null" && stream !== body.stream) {
			//add all guilds to array, check each guild for streaming enabled and send to logChannel for server.
			client.channels.get('398676006325452801').send(`**${name.toProperCase()}** is now streaming! Head to https://twitch.tv/${name} to tune in.`);
		}
		stream = body.stream;
	}
	request(options, callback);

	const update = () => {
		if (stream == "null") request(options, callback);
		if (
	}*/

	await client.wait(1000);
	console.log(`Ready: ${client.user.tag}, ready to serve ${client.users.size} users in ${client.guilds.size} servers.`);
	client.guilds.filter(g => !client.settings.has(g.id)).forEach(g => client.settings.set(g.id, client.config.defaultSettings));
	//client.channels.find("id", client.rebootChannel).send(`${client.user.tag}, ready to serve ${client.users.size} users.`);
	//client.rebootChannel = "";

//	const int = setInterval(update, 60000);
};
