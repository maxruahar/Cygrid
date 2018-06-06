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

	let x = "false";
	if (x._called) message.channel.send('not as you thought');
	x = setTimeout(() => {message.channel.send('test')}, 2000);
	setTimeout(() => {if (x._called == false) message.channel.send('false')}, 1000);
	setTimeout(() => {if (x._called == true) message.channel.send('true1')}, 1000);
	setTimeout(() => {if (x._called == false) message.channel.send('false2')}, 4000);
	setTimeout(() => {if (x._called == true) message.channel.send('true')}, 4000);

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Bot Admin",
  guilds: [],
  cooldown: 2500
};

exports.help = {
  name: "test",
  category: "System",
  description: "This is a test command.",
  usage: "test"
};
