exports.run = async (client, message, args, level) => {
  const set = client.settings.get(message.guild.id);
  const prefix = set.prefix;
  let err, status, rot, resets;
  const request = require('request-promise-native');
  await request("https://runescape.wiki/w/Template:Vorago_rotations", (error, response, body) => {
    err = error;
    status = response && response.statusCode;
    if (error || status !== 200) return message.channel.send(`Error collecting data: Code ${status}`);
    rot = body.split('td class="table-bg-green">')[1].split("</td>")[0];
    resets = body.split('<b>Next: ')[1].split(/\sdays?<\/b>/i)[0];
  });
  const opt = resets !== "1" ? "s" : "";
  const current = rot.toLowerCase() == "vitalis" ? `\n\n**This is the current rotation for an additional __${resets}__ reset${opt}.**` : "";

  const e = {
    "embed": {
      "description": `[Comprehensive Normal Mode Vorago Guide](https://docs.google.com/document/d/1vDQSdwDh-s5gG93yVljhTDZfumy3DdYvtuBjLEF7r3o)${current}\n\n***Note: Vitalis will spawn in the NE quadrant for P3 and P4 unless rago is walked before.***\n\n**Phase** 3: Vitalis➔ 3 Att➔ OFF➔ 3 Att➔ Vitalis➔ 3 Att➔ 5 Smashes➔ 3 Att\n**Phase** 4: Waterfall➔ 3 Att➔ Clones➔ 7 Att➔ Vitalis➔ 3 Att➔ 5 Smashes➔ 3 Att➔ OFF➔ 3 Att\n**Phase** 5: Vitalis➔ 3 Att➔ OFF➔ 3 Att➔ 3 Smashes➔ 3 Att\n\n__**Strategy**__:\n• P3: Sunshine drop (all) around Vorago, base/DPS Melee Distance, Bomb Tank 1 away from Melee Distance, Detonate and Threshold after Reflect. Ignore Vitalis spawns. Bomb Tank should be within Melee Distance on Reflect for trios. Pray flick Deflect Mage/Melee at this point.\n• P5: Bomb Tank Wild Magic 2 bleeds Intercept Barricade. Base/DPS Sunshine or Threshold. Build to Onslaught + instantly Barricade after bleeds. The priority is to kill all Vitalis spawns asap.`,
      "color": 8197085,
      "footer": {
        "text": "Guides written by Landon#4180"
      },
      "author": {
        "name": "Normal Mode Vorago Vitalis Rotation Info",
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
  aliases: ["vit"],
  permLevel: "User",
  guilds: [],
  cooldown: 2500
};

exports.help = {
  name: "vitalis",
  category: "RuneScape",
  description: "Info on Vitalis rotation and strategies for Normal Mode Vorago",
  usage: "vitalis"
};
