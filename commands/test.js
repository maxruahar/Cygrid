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

const options = {
	url: 'https://hooks.zapier.com/hooks/catch/2830250/fbzex5/',
	method: "POST",
	body: "Sent from a discord.js bot"
}



function callback(error,response,body) {
	message.channel.send(response.statusMessage);
	message.channel.send(body);
    }

request(options, callback);

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
