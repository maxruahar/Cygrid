exports.run = async (client, message, args, level) => {
  const set = client.settings.get(message.guild.id);
  const prefix = set.prefix;
  let err, status, rot, resets, omens, list = [`${prefix}ceilingshm`, `${prefix}scopulushm`, `${prefix}vitalishm`, `${prefix}gbhm`, `${prefix}tshm`, `${prefix}pbhm`]
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
      omens = "Torso";
      list[0] = `**${list[0]}**`;
      break;
    case "scopulus":
      omens = "Helm";
      list[1] = `**${list[1]}**`;
      break;
    case "vitalis":
      omens = "Legs";
      list[2] = `**${list[2]}**`;
      break;
    case "green bomb":
      omens = "Boots";
      list[3] = `**${list[3]}**`;
      break;
    case "team split":
      omens = "Maul";
      list[4] = `**${list[4]}**`;
      break;
    case "the end":
      omens = "Gloves";
      list[5] = `**${list[5]}**`;
      break;
  }

  const e = {
    "embed": {
      "description": `**The current rotation is __${nick}__ for an additional __${resets}__ reset${opt}.**\nOmens unlock: **${omens}**\n[Comprehensive Hard Mode Vorago Guide](https://www.youtube.com/watch?v=SdUbAqHAHOE)\n\n**Phase** 1: Red➔ 4 Att\n**Phase** 2: 5 Smashes➔ 3 Att➔ OFF➔ 3 Att➔ Red Bomb➔ 4 Att\n**Phase** 3: Rock➔ 3 Att➔ OFF➔ 3 Att➔ Rock➔ 3 Att➔ Red➔ 4 Att\n**Phase** 4: 3 Scopulii spawn (Mid SW, Mid SE, N)➔ Blue bombs (until all 3 die)\n**Phase** 5: Vitalis➔ 3 Att➔ OFF➔ 3 Att➔ Vitalis➔ 3 Att➔ 5 Smashes➔ 3 Att\n**Phase** 6: Green➔ 5 Att (or skip)➔ OFF➔ 3 Att➔ Green➔ 5 Att (or skip)➔ Red➔ 4 Att\n**Phase** 7: TS➔ 3 Att➔ OFF➔ 3 Att➔ TS➔ 3 Att➔ Red➔ 4 Att\n**Phase** 8: The End➔ 3 Att➔ OFF➔ 3 Att➔ The End➔ 3 Att➔ Red➔ 4 Att\n  - For information on **Phases 9**, **10**, and **11** see the guides below`,
      "color": 8197085,
      "footer": {
        "text": "Guides written by Landon#4180"
      },
      "author": {
        "name": "Hard Mode Vorago Rotation Info",
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
          "value": `*Use ${prefix}rago for Normal Mode commands.\nUse ${prefix}maul for further mauling information.*`
        }
      ]
    }
  };

  return message.channel.send(e);

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["ragohm"],
  permLevel: "User",
  guilds: [],
  cooldown: 2500
};

exports.help = {
  name: "voragohm",
  category: "RuneScape",
  description: "Hard Mode Vorago rotation information",
  usage: "voragohm"
};
