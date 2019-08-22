exports.run = async (client, message, args, level) => {
  if (!["528268403098779658", "611203340335841290"].includes(message.channel.id) && message.author.id !== "97928972305707008") return;
  const set = client.settings.get(message.guild.id);
  const prefix = set.prefix;
  message.delete();
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
  const current = rot.toLowerCase() !== "scopulus" ? `\n\n**This is the current rotation for an additional __${resets}__ reset${opt}.**` : "";

  const e = {
    "embed": {
      "description": `[Comprehensive Hard Mode Vorago Guide](https://www.youtube.com/watch?v=SdUbAqHAHOE)\nWhen to maul: **Team Split.**\nCade timing: **P10 Pb release | P11 Vit orb.**\nOmens unlock: **Helm.**${current}\n\n**Phase** 9: Waterfall➔ 3 Att➔ Clones➔ 7 Att➔ Red➔ 4 Att➔ 5 Smashes➔ 3 Att➔ OFF➔ 3 Att \n**Phase** 10 (Pb/Bleeds): Purple➔ 5 Att➔ OFF➔ 3 Att➔ TS➔ 3 Att\n**Phase** 11 (Pb/Vit): Purple➔ 5 Att➔ OFF➔ 3 Att➔ Vitalis➔ 3 Att\n\n__**Strategy**__:\n• P10: Sun drop, **TANK TS**. __Bt1__: D/s (P9) for 1st blue, cade cept team on 2nd, sun if needed. __Bt2__: D/s 1st blue, sun.\n• P11: Build, block vit orb then sun/ons. __Bts__: Both debil and take turns cade/sun vit orb.`,
      "color": 8197085,
      "footer": {
        "icon_url": "https://cdn.discordapp.com/avatars/300296497277173761/11a5088f52b4b37fa579c412a63950ec.png",
        "text": "Guides written by Landon#4180"
      },
      "author": {
        "name": "Hard Mode Vorago Scopulus Rotation Info",
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
  aliases: ["scophm"],
  permLevel: "User",
  guilds: [],
  cooldown: 2500
};

exports.help = {
  name: "scopulushm",
  category: "RuneScape",
  description: "Info on Scopulus rotation and strategies for Hard Mode Vorago",
  usage: "scopulushm"
};
