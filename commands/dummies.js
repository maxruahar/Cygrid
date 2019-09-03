exports.run = async (client, message, args, level) => {
  const set = client.settings.get(message.guild.id);
  const prefix = set.prefix;

  const e = {
    "embed": {
      "description": "Avoid placing under Vorago's spawn (middle) and Scopulus spawns (Mid-SW/SW/N).\nFor Ceilings, Vitalis, and Green Bomb rotations, place immediately after dropdown.\nFor 5man+ teams you only need 4 (Entrance, Green Bomb and P9/10). All others are optional.",
      "color": 8197085,
      "footer": {
        "text": "Guides written by Landon#4180"
      },
      "author": {
        "name": "Hard Mode Vorago Combat Dummy Placement Info",
        "url": "https://discord.gg/fy6AFuz",
        "icon_url": "https://cdn.discordapp.com/icons/508332998437896204/b98d05ec172f1899a16e4eb264d1a7e2.png"
      },
      "fields": [
        {
          "name": "​",
          "value": "• **Entry**: Before Challenge. Use it to ult/cade early on P1, or transfigure (if not a tank role).\n• **P2**: (__4/5man__) as Bring Him Down starts. Use it to Nat Instinct after first jump.\n• **P3** (Ceils): Use it to sunshine and build.\n• **P4** (Scops): (__4/5man__) Place when there's 1 Scop left __OR__ dropdown for larger teams.\n• **P5** (Vit): (__4/5man__) Place SW or SE. Avoid NE. Only useful if melee zerks on start.\n• **P6** (Gb):  Place W, SW or S. Use it to build when Phase ends __OR__ to sun and build if it's 4man or if bts are too low hp to Ons.\n• **P9**: As last reflect ends. Use it to Nat Instinct after first jump. Then sun P10 start.\n• **P10**: Can be placed before mauling to start P11 with adren."
        },
        {
          "name": "​",
          "value": `*Use ${prefix}ragohm for Hard Mode commands.\nUse ${prefix}maul for further mauling information.\nUse ${prefix}rago for Normal Mode commands.*`
        }
      ]
    }
  };

  return message.channel.send(e);

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["dummy"],
  permLevel: "User",
  guilds: [],
  cooldown: 2500
};

exports.help = {
  name: "dummies",
  category: "RuneScape",
  description: "Hard Mode Vorago combat dummy placement information",
  usage: "dummies"
};
