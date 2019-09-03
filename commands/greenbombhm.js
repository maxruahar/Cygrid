exports.run = async (client, message, args, level) => {
  const set = client.settings.get(message.guild.id);
  const prefix = set.prefix;
  let err, status, rot, resets, omens;
  const request = require('request-promise-native');
  await request("https://runescape.wiki/w/Template:Vorago_rotations", (error, response, body) => {
    err = error;
    status = response && response.statusCode;
    if (error || status !== 200) return message.channel.send(`Error collecting data: Code ${status}`);
    rot = body.split('td class="table-bg-green">')[1].split("</td>")[0];
    resets = body.split('<b>Next: ')[1].split(/\sdays?<\/b>/i)[0];
  });
  const opt = resets !== "1" ? "s" : "";
  const current = rot.toLowerCase() !== "green bomb" ? `\n\n**This is the current rotation for an additional __${resets}__ reset${opt}.**` : "";

  const e = {
    "embed": {
      "description": `[Comprehensive Hard Mode Vorago Guide](https://www.youtube.com/watch?v=SdUbAqHAHOE)\nWhen to maul: **Green bomb release.**\nCade timing: **P10 Vit orb | P11 TS.**\nOmens unlock: **Boots.**${current}\n\n**Phase** 9: Waterfall➔ 3 Att➔ Clones➔ 7 Att➔ Green➔ 5 Att (or skip)➔ 5 Smashes➔ 3 Att➔ OFF➔ 3 Att\n**Phase** 10 (Gb/Vit): Green➔ 5 Att (or skip)➔ OFF➔ 3 Att➔ Vitalis➔ 3 Att\n**Phase** 11 (Gb/Ts): Green➔ 5 Att (or skip)➔ OFF➔ 3 Att➔ TeamSplit➔ 3 Att\n\n__**Strategy**__:\n• P10: auto>Ons MD asap. __Bts__: Both D/s 1 step off MD North, auto>ons drop.\n• P11: Sun, repri TS (tank). __Bts__: Bts debil/dome during Reflect. Take turns to cade/sun TS.`,
      "color": 8197085,
      "footer": {
        "text": "Guides written by Landon#4180"
      },
      "author": {
        "name": "Hard Mode Vorago Green Bomb Rotation Info",
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
  aliases: ["gbhm"],
  permLevel: "User",
  guilds: [],
  cooldown: 2500
};

exports.help = {
  name: "greenbombhm",
  category: "RuneScape",
  description: "Info on Green Bomb rotation and strategies for Hard Mode Vorago",
  usage: "greenbombhm"
};
