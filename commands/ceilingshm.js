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
  const current = rot.toLowerCase() == "ceiling collapse" ? `\n\n**This is the current rotation for an additional __${resets}__ reset${opt}.**` : "";

  const e = {
    "embed": {
      "description": `[Comprehensive Hard Mode Vorago Guide](https://www.youtube.com/watch?v=SdUbAqHAHOE)\nWhen to maul: **Green bomb release.**\nCade timing: **P10 1st blue after TS | P11 Vit orb.**\nOmens unlock: **Torso.**${current}\n\n**Phase** 9: Waterfall➔ 3 Att➔ Clones➔ 7 Att➔ Rocks➔ 3 Att➔ 5 Smashes➔ 3 Att➔ OFF➔ 3 Att\n**Phase** 10 (TS/Gb): TS➔ 3 Att➔ OFF➔ 3 Att➔ Green➔ 5 Att\n**Phase** 11 (TS/Vit): TS➔ 3 Att➔ OFF➔ 3 Att➔ Vitalis (*or red)➔ 3 Att\n\n__**Strategy**__:\n• P10: Thresh, Ons after reflect. __Bt1__: D/s, cade cept 2nd blue, sun after. __Bt2__: D/s and sun.\n• P11: Reprisal TS, Sun apot and thresh. Block vit orb. __Bts__: bts debil/dome Reflect, cade vits. *red if Rago is close to the edge.`,
      "color": 8197085,
      "footer": {
        "text": "Guides written by Landon#4180"
      },
      "author": {
        "name": "Hard Mode Vorago Ceilings Rotation Info",
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
  aliases: ["ceilinghm", "ceilhm"],
  permLevel: "User",
  guilds: [],
  cooldown: 2500
};

exports.help = {
  name: "ceilingshm",
  category: "RuneScape",
  description: "Info on Ceilings rotation and strategies for Hard Mode Vorago",
  usage: "ceilingshm"
};
