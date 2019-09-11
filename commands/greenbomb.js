exports.run = async (client, message, args, level) => {
  const set = client.settings.get(message.guild.id);
  const prefix = set.prefix;
  let err, status, rot, resets;
  const request = require('request-promise-native');
  await request("https://runescape.wiki/w/Vorago", (error, response, body) => {
    err = error;
    status = response && response.statusCode;
    if (error || status !== 200) return message.channel.send(`Error collecting data: Code ${status}`);
    rot = body.split('td class="table-bg-green">')[1].split("</td>")[0];
    resets = body.split('<b>Next: ')[1].split(/\sdays?<\/b>/i)[0];
  });
  const opt = resets !== "1" ? "s" : "";
  const current = rot.toLowerCase() == "green bomb" ? `\n\n**This is the current rotation for an additional __${resets}__ reset${opt}.**` : "";

  const e = {
    "embed": {
      "description": `[Comprehensive Normal Mode Vorago Guide](https://docs.google.com/document/d/1vDQSdwDh-s5gG93yVljhTDZfumy3DdYvtuBjLEF7r3o)${current}\n\n**Phase** 3: Green➔ 5 Att (or skip)➔ OFF➔ 3 Att➔ Green➔ 5 Att (or skip)➔ Red➔ 4 Att\n**Phase** 4: Waterfall➔ 3 Att➔ Clones➔ 7 Att➔ Green➔ 5 Att (or skip)➔ 5 Smashes➔ 3 Att➔ OFF➔ 3 Att\n**Phase** 5: Green➔ 5 Att (or skip)➔ OFF➔ 3 Smashes➔ 3 Att➔ Green➔ Red➔ 4 Att\n\n__**Strategy**__:\n• P3: Sunshine drop (all) between 2 quadrants. Tank Green Bomb, Detonate threshold. Base Devotion Intercept with Deflect Magic if on Bomb Tank, Detonate/Threshold after Reflect. Bounce or Devotion Intercept 2nd Green Bomb, can Reprisal this one.\n• P5: Bomb Tank Asphyxiate 2 bleeds. Wait for Green Bomb before Barricading. If on Bomb Tank, deal with it like on P3, or bounce to Base and build to Barricade. Base/dps Sunshine drop, Onslaught after bleeds.`,
      "color": 8197085,
      "footer": {
        "text": "Guides written by Landon#4180"
      },
      "author": {
        "name": "Normal Mode Vorago Green Bomb Rotation Info",
        "url": "https://discord.gg/fy6AFuz",
        "icon_url": "https://cdn.discordapp.com/icons/508332998437896204/b98d05ec172f1899a16e4eb264d1a7e2.png"
      },
      "fields": [
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
  aliases: ["gb"],
  permLevel: "User",
  guilds: [],
  cooldown: 2500
};

exports.help = {
  name: "greenbomb",
  category: "RuneScape",
  description: "Info on Green Bomb rotation and strategies for Normal Mode Vorago",
  usage: "greenbomb"
};
