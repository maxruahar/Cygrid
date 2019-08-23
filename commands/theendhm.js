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
  const current = rot.toLowerCase() !== "the end" ? `\n\n**This is the current rotation for an additional __${resets}__ reset${opt}.**` : "";

  const e = {
    "embed": {
      "description": `[Comprehensive Hard Mode Vorago Guide](https://www.youtube.com/watch?v=SdUbAqHAHOE)\nWhen to maul: **Purple bomb release.**\nCade timing: **P10 Pb | P11 Vit orb.**\nOmens unlock: **Gloves.**${current}\n\n**Phase** 9: Waterfall➔ 3 Att➔ Clones➔ 7 Att➔ The End➔ 3 Att➔ Red➔ 4 Att➔ OFF➔ 3 Att\n**Phase** 10 (Pb/Bleeds): Purple➔ 5 Att➔ OFF➔ 3 Att➔ 3 Bleeds➔ 3 Att\n**Phase** 11 (Pb/Vit): Purple➔ 5 Att➔ OFF➔ 3 Att➔ Vitalis➔ 3 Att\n\n__**Strategy**__:\n• P10: Sun, clear bleeds. __Bt1__: Cade cept Pb, dome Reflect. Try to maul or debil after smashes. __Bt2__: Sun.\n• P11: Sun and block Vit orb. __Bts__: debil, dome during reflect. Take turns cade/sun vit orbs.`,
      "color": 8197085,
      "footer": {
        "icon_url": "https://cdn.discordapp.com/avatars/300296497277173761/11a5088f52b4b37fa579c412a63950ec.png",
        "text": "Guides written by Landon#4180"
      },
      "author": {
        "name": "Hard Mode Vorago The End Rotation Info",
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
  aliases: ["pbhm"],
  permLevel: "User",
  guilds: [],
  cooldown: 2500
};

exports.help = {
  name: "theendhm",
  category: "RuneScape",
  description: "Info on Ceilings rotation and strategies for Hard Mode Vorago",
  usage: "theendhm"
};
