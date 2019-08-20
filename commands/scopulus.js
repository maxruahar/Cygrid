exports.run = async (client, message, args, level) => {
  if (!["528268403098779658", "611203340335841290"].includes(message.channel.id)) return;
  const set = client.settings.get(message.guild.id);
  const prefix = set.prefix;
  message.delete();
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
  const current = rot.toLowerCase() == "scopulus" ? `\n\n**This is the current rotation for an additional __${resets}__ reset${opt}.**` : "";

  const e = {
    "embed": {
      "description": `[Comprehensive Normal Mode Vorago Guide](https://docs.google.com/document/d/1vDQSdwDh-s5gG93yVljhTDZfumy3DdYvtuBjLEF7r3o)${current}\n\n**Phase** 3: 2 Scopulii spawn (Mid SW, Mid SE)➔ Blue bombs (until both die)\n**Phase** 4: Waterfall➔ 3 Att➔ Clones➔ 7 Att➔ Red➔ 4 Att➔ 5 Smashes➔ 3 Att➔ OFF➔ 3 Att \n**Phase** 5: Purple➔ 5 Att➔ OFF➔ 3 Att➔ 3 Smashes➔ 3 Att\n** **\n__**Strategy**__: P3: Sun drop. Vuln scops. Res 3rd blue (bt), deto (all) and use Barrage spells if 4taa.\nP5: Bt Wm 2 bleeds vuln and cade, Base/dps ons drop 1 north 1 south, build to sun. If 4man+, sunshine first and ons after bleeds.`,
      "color": 8197085,
      "footer": {
        "icon_url": "https://cdn.discordapp.com/avatars/300296497277173761/11a5088f52b4b37fa579c412a63950ec.png",
        "text": "Guides written by Landon#4180"
      },
      "author": {
        "name": "Normal Mode Vorago Scopulus Rotation Info",
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
  aliases: ["scop"],
  permLevel: "User",
  guilds: [],
  cooldown: 2500
};

exports.help = {
  name: "scopulus",
  category: "RuneScape",
  description: "Info on Scopulus rotation and strategies for Normal Mode Vorago",
  usage: "scopulus"
};
