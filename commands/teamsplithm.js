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
  const current = rot.toLowerCase() !== "team split" ? `\n\n**This is the current rotation for an additional __${resets}__ reset${opt}.**` : "";

  const e = {
    "embed": {
      "description": `[Comprehensive Hard Mode Vorago Guide](https://www.youtube.com/watch?v=SdUbAqHAHOE)\nWhen to maul: **Reflect.**\nCade timing: **P10 odd TS (1st, 3rd...) | P11 TS.**\nOmens unlock: **Maul.**${current}\n\n**Phase** 9: Waterfall➔ 3 Att➔ Clones➔ 7 Att➔ TS➔ 3 Att➔ 5 Smashes➔ 3 Att➔ OFF➔ 3 Att\n**Phase** 10 (TS/TS): TS➔ 3 Att➔ OFF➔ 3 Att➔ Team Split➔ 3 Att\n**Phase** 11 (TS/PB): TS➔ 3 Att➔ OFF➔ 3 Att➔ Purple➔ 5 Att\n\n__**Strategy**__: P10: Sun then go to the TS box, always tank even TS (2, 4...) a.k.a the ones after reflect, can reprisal those. __Bt1__: D/s 1st blue, cade 2nd. Sun 2nd TS. __Bt2__: D/s 1st blue, Sun drop, Repri 2nd TS, reso.\nP11: Sun, reprisal TS. __Bt2__: Debil, can cade Pb intead if push is good. Repri TS + D/s. __Bt1__: Debil, Sun pb, D/s Ts, cade cept heal 2nd blue.`,
      "color": 8197085,
      "footer": {
        "icon_url": "https://cdn.discordapp.com/avatars/300296497277173761/11a5088f52b4b37fa579c412a63950ec.png",
        "text": "Guides written by Landon#4180"
      },
      "author": {
        "name": "Hard Mode Vorago Team Split Rotation Info",
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
  aliases: ["tshm"],
  permLevel: "User",
  guilds: [],
  cooldown: 2500
};

exports.help = {
  name: "teamsplithm",
  category: "RuneScape",
  description: "Info on Team Split rotation and strategies for Hard Mode Vorago",
  usage: "teamsplithm"
};
