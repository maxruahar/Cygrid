exports.run = async (client, message, args, level) => {
  const set = client.settings.get(message.guild.id);
  const prefix = set.prefix;
  let err, status, rot, resets, omens;
  const request = require('request-promise-native');
  await request("https://runescape.wiki/w/Vorago", (error, response, body) => {
    err = error;
    status = response && response.statusCode;
    if (error || status !== 200) return message.channel.send(`Error collecting data: Code ${status}`);
    rot = body.split('td class="table-bg-green">')[1].split("</td>")[0];
    resets = body.split('<b>Next: ')[1].split(/\sdays?<\/b>/i)[0];
  });
  const opt = resets !== "1" ? "s" : "";
  const current = rot.toLowerCase() == "vitalis" ? `\n\n**This is the current rotation for an additional __${resets}__ reset${opt}.**` : "";

  switch (rot.toLowerCase()) {
    case "ceiling collapse":
      omens = "Torso";
      break;
    case "scopulus":
      omens = "Helm";
      break;
    case "vitalis":
      omens = "Legs";
      break;
    case "green bomb":
      omens = "Boots";
      break;
    case "team split":
      omens = "Maul";
      break;
    case "the end":
      omens = "Gloves";
      break;
  }

  const e = {
    "embed": {
      "description": `[Comprehensive Hard Mode Vorago Guide](https://www.youtube.com/watch?v=SdUbAqHAHOE)\nWhen to maul: **Reflect.**\nCade timing: **P10 Vit orb | P11 Vit orb.**\nOmens unlock: **${omens}.**${current}\n\n***Note: Vitalis will spawn in the NE quadrant for P9 unless rago is walked before***\n\n**Phase** 9: Waterfall➔ 3 Att➔ Clones➔ 7 Att➔ Vit➔ 3 Att➔ 5 Smashes➔ 3 Att➔ OFF➔ 3 Att\n**Phase** 10 (Vit/Pb): Vit➔ 3 Att➔ OFF➔ 3 Att➔ Pb➔ 5 Att\n**Phase** 11 (Vit/Bleeds): Vit➔ 3 Att➔ OFF➔ 3 Att➔ 3 Bleeds➔ 3 Att\n** **\n__**Strategy**__:\n• P10: Sun/thresh. __Bt1__: cade cept vit orb then sun. __Bt2__: Sun.\n• P11: block Vit orb, sun and clear bleeds after Reflect. __Bts__: debil, take turns to cade vits and sun.`,
      "color": 8197085,
      "footer": {
        "text": "Guides written by Landon#4180"
      },
      "author": {
        "name": "Hard Mode Vorago Vitalis Rotation Info",
        "url": "https://discord.gg/fy6AFuz",
        "icon_url": "https://cdn.discordapp.com/icons/508332998437896204/b98d05ec172f1899a16e4eb264d1a7e2.png"
      },
      "fields": [
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
  aliases: ["vithm"],
  permLevel: "User",
  guilds: [],
  cooldown: 2500
};

exports.help = {
  name: "vitalishm",
  category: "RuneScape",
  description: "Info on Vitalis rotation and strategies for Hard Mode Vorago",
  usage: "vitalishm"
};
