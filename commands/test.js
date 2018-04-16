exports.run = (client, message, args, level) => {
  const { inspect } = require("util");
  var request = require('request');

/*  var options = {
    url: 'https://api.twitch.tv/kraken/streams/runescape',
    headers: {
      'Client-ID': 'vyxo0jjtz4zpjr3tc6k122qlz8iaxd'
    }
  };

  function callback(error, response, body) {
    if (JSON.parse(body).stream !== null) {
      message.channel.send("Online!");
    } else {
      message.channel.send("Offline.");
    }
  }

  request(options, callback);*/

	const x = [1, 2, 3, 4, 5, 6, 7];
	x.forEach(y => {
		message.channel.send(`https://cdn.runescape.com/assets/img/external/news/2018/4/EliteDungeon${y}.png`;
	});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Bot Owner",
  guilds: [],
  cooldown: 2500
};

exports.help = {
  name: "test",
  category: "System",
  description: "This is a test command.",
  usage: "test"
};
