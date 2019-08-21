exports.run = async (client, message, args, level) => {
  if (!["528268403098779658", "611203340335841290"].includes(message.channel.id) && message.author.id !== "97928972305707008") return;
  const set = client.settings.get(message.guild.id);
  const prefix = set.prefix;
  message.delete();
  let err, status, rot, resets;
  const list = [`Ceilings`, `Scopulus`, `Vitalis`, `Green Bomb`, `Team Split`, `The End`],
  desc = ["Maul Gb release, P11: 5 Att➔ (TS➔ 3 Att➔ OFF➔ 3 Att➔ Vit➔ 3 Att)\nMaul Ts, P11: 3 Att➔ OFF➔ 3 Att➔ Vit➔ 3 Att➔ TS\nMaul Reflect, P11: 3 Att➔ Vit➔ 3 Att➔ TS➔ 3 Att➔ OFF",
    "Maul Ts, P11: 3 Att➔ Pb➔ 5 Att➔ OFF➔ 3 Att➔ Vit\nMaul Pb release, P11: 5 Att➔ OFF➔ 3 Att➔ Vit➔ 3 Att➔ Pb\nMaul Reflect, P11: 3 Att➔ Vit➔ 3 Att➔ Pb➔ 5 Att➔ OFF",
    "Maul Reflect, P11: 3 Att➔ 3 Bleeds➔ 3 Att➔ Vit➔ 3 Att➔ OFF\nMaul Pb release, P11: 5 Att➔ (Vit➔ 3 Att➔ OFF➔ 3 Att➔ 3 Bleeds➔ 3 Att)\nMaul Vit release, P11: 3 Att➔ OFF➔ 3 Att➔ 3 Bleeds➔ 3 Att➔ Vit",
    "Maul Gb release, P11: 5 Att➔ OFF➔ 3 Att➔ TS➔ 3 Att➔ Gb\nMaul Vit release, P11: 3 Att➔ Gb➔ 5 Att➔ OFF➔ 3 Att➔ TS\nMaul Reflect, P11: 3 Att➔ TS➔ 3 Att➔ Gb➔ 5 Att➔ OFF",
    "Maul Reflect, P11: 3 Att➔ Pb➔ 5 Att➔ TS➔ 3 Att➔ OFF\nMaul 1st Ts, P11: 3 Att➔ OFF➔ 3 Att➔ Pb➔ 5 Att➔ TS\nMaul 2nd Ts, P11: 3 Att➔ (TS➔ 3 Att➔ OFF➔ 3 Att➔ Pb➔ 5 Att)",
    "Maul Pb release, P11: 5 Att➔ OFF➔ 3 Att➔ Vit➔ 3 Att➔ Pb\nMaul After bleeds, P11: 3 Att➔ Pb➔ 5 Att➔ OFF➔ 3 Att➔ Vit\nMaul Reflect, P11: 3 Att➔ Vit➔ 3 Att➔ Pb➔ 5 Att➔ OFF"];
  const request = require('request-promise-native');
  await request("https://runescape.wiki/w/Template:Vorago_rotations", (error, response, body) => {
    err = error;
    status = response && response.statusCode;
    if (error || status !== 200) return message.channel.send(`Error collecting data: Code ${status}`);
    rot = body.split('td class="table-bg-green">')[1].split("</td>")[0];
    resets = body.split('<b>Next: ')[1].split(" days</b>")[0];
  });
  const nick = rot.toLowerCase() !== "ceiling collapse" ? rot.toProperCase() : "Ceilings";

  switch (rot.toLowerCase()) {
    case "ceiling collapse":
      list[0] = `**${list[0]}**`;
      desc[0] = `**${desc[0]}**`;
      break;
    case "scopulus":
      list[1] = `**${list[1]}**`;
      desc[1] = `**${desc[1]}**`;
      break;
    case "vitalis":
      list[2] = `**${list[2]}**`;
      desc[2] = `**${desc[2]}**`;
      break;
    case "green bomb":
      list[3] = `**${list[3]}**`;
      desc[3] = `**${desc[3]}**`;
      break;
    case "team split":
      list[4] = `**${list[4]}**`;
      desc[4] = `**${desc[4]}**`;
      break;
    case "the end":
      list[5] = `**${list[5]}**`;
      desc[5] = `**${desc[5]}**`;
      break;
  }

  const e = {
    "embed": {
      "description": `**When to maul and how P11 will start.**\n\n__${list[0]}__\n${desc[0]}\n\n__${list[1]}__\n${desc[1]}\n\n__${list[2]}__\n${desc[2]}\n\n__${list[3]}__\n${desc[3]}\n\n__${list[4]}__\n${desc[4]}\n\n__${list[5]}__\n${desc[5]}`,
      "color": 8197085,
      "footer": {
        "icon_url": "https://cdn.discordapp.com/avatars/300296497277173761/11a5088f52b4b37fa579c412a63950ec.png",
        "text": "Guides written by Landon#4180"
      },
      "author": {
        "name": "Hard Mode Vorago Mauling Info",
        "url": "https://discord.gg/fy6AFuz",
        "icon_url": "https://cdn.discordapp.com/icons/508332998437896204/b98d05ec172f1899a16e4eb264d1a7e2.png"
      },
      "fields": [
        {
          "name": "​",
          "value": `*Use ${prefix}ragohm for Hard Mode commands.*\n*Use ${prefix}rago for Normal Mode commands.*`
        }
      ]
    }
  };

  return message.channel.send(e);

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["maul"],
  permLevel: "User",
  guilds: [],
  cooldown: 2500
};

exports.help = {
  name: "mauling",
  category: "RuneScape",
  description: "Hard Mode Vorago mauling information",
  usage: "mauling"
};
