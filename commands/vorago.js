exports.run = async (client, message, args, level) => {
  if (!["528268403098779658", "611203340335841290"].includes(message.channel.id)) return;
  const set = client.settings.get(message.guild.id);
  const prefix = set.prefix;
  message.delete();
  let err, status, rot, resets, list = [`${prefix}ceilings`, `${prefix}scopulus`, `${prefix}vitalis`, `${prefix}gb`, `${prefix}ts`, `${prefix}pb`]
  const request = require('request-promise-native');
  await request("https://runescape.wiki/w/Template:Vorago_rotations", (error, response, body) => {
    err = error;
    status = response && response.statusCode;
    if (error || status !== 200) return message.channel.send(`Error collecting data: Code ${status}`);
    rot = body.split('td class="table-bg-green">')[1].split("</td>")[0];
    resets = body.split('<b>Next: ')[1].split(/\sdays?<\/b>/i)[0];
  });
  const nick = rot.toLowerCase() !== "ceiling collapse" ? rot.toProperCase() : "Ceilings";
  const opt = resets !== "1" ? "s" : "";

  switch (rot.toLowerCase()) {
    case "ceiling collapse":
      list[0] = `**${list[0]}**`;
      break;
    case "scopulus":
      list[1] = `**${list[1]}**`;
      break;
    case "vitalis":
      list[2] = `**${list[2]}**`;
      break;
    case "green bomb":
      list[3] = `**${list[3]}**`;
      break;
    case "team split":
      list[4] = `**${list[4]}**`;
      break;
    case "the end":
      list[5] = `**${list[5]}**`;
      break;
  }

  const e = {
    "embed": {
      "description": `**The current rotation is __${nick}__ for an additional __${resets}__ reset${opt}.**\n[Comprehensive Normal Mode Vorago Guide](https://docs.google.com/document/d/1vDQSdwDh-s5gG93yVljhTDZfumy3DdYvtuBjLEF7r3o)\n\n**Phase** 1: Red➔ 4 Attacks (repeat)\n**Phase** 2: 5 Smashes➔ 3 Attacks➔ 3 Attacks➔ Red Bomb➔ 4 Attacks (repeat)\n  - For information on phases 3, 4, and 5 use one of the commands listed below`,
      "color": 8197085,
      "footer": {
        "icon_url": "https://cdn.discordapp.com/avatars/300296497277173761/11a5088f52b4b37fa579c412a63950ec.png",
        "text": "Guides written by Landon#4180"
      },
      "author": {
        "name": "Normal Mode Vorago Rotation Info",
        "url": "https://discord.gg/fy6AFuz",
        "icon_url": "https://cdn.discordapp.com/icons/508332998437896204/b98d05ec172f1899a16e4eb264d1a7e2.png"
      },
      "fields": [
        {
          "name": "Rotation Guides:",
          "value": list.join(" | ")
        },
        {
          "name": "​",
          "value": `*Use ${prefix}ragohm for Hard Mode commands.*`
        }
      ]
    }
  };

  return message.channel.send(e);

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["rago"],
  permLevel: "User",
  guilds: [],
  cooldown: 2500
};

exports.help = {
  name: "vorago",
  category: "RuneScape",
  description: "Normal Mode Vorago rotation information",
  usage: "vorago"
};
