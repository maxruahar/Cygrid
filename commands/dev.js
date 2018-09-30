exports.run = async (client, message, args, level) => {

  const info = {
    "embed": {
      "author": {
        "name": "Cygrid Dev",
        "url": "https://discord.gg/qqducRK",
        "icon_url": "https://cdn.discordapp.com/icons/433447855127003157/bb43a928de129b175d67e8436b607a6f.png"
      },
      "description": "Cygrid Dev is a discord server created for discussing the development of the Cygrid Bot. Cygrid is designed and maintained by <@97928972305707008> and its vision is to meet the niche needs of RuneScape Discord servers. If you have any need or desire to see a feature implemented for practical use within your Discord server, please contact Max so he can discover its feasibility and plausibility!",
      "color": 10070709,
      "timestamp": "2018-09-24T14:22:36.701Z",
      "footer": {
        "icon_url": "https://cdn.discordapp.com/avatars/398315492877533186/5b247929910a9d9aa22b164521d4635d.png",
        "text": "Cygrid"
      },
      "fields": [
        {
          "name": "Major Feature #1: Polling",
          "value": "One of the most notable features is the polling system. It is very easy to use and will create an embedded question/answer template and auto-react to all the available options for you. This is limited to a question of X characters and X amount of answers. The proper usage is: \"**.poll Each question must end in a question mark? While  each  answer  is  split  with  two  spaces**\""
        },
        {
          "name": "Major Feature #2: Jagex Moderator Spam Prevention",
          "value": "Everyone knows it's an awesome thing to have Jagex Moderators within our servers, however, many JMods do not have time to reply to every message. This can lead to frustration on both sides of the conversation. To help this, Max worked a system with JMods to have the Cygrid bot respond in lieu of the JMods to let your users know that they will not be able to answer every tag. This also encourages tagging to be kept to a minimum, if not non-existent."
        },
        {
          "name": "Major Feature #3: Advertising Block",
          "value": "Many servers across Discord fell victim to a data poaching attack that allowed information to be sold to advertisers. These advertisers would enter into Discord servers with their display name set to a Discord invite link. Cygrid was made to auto-detect such instances and reply with a ban to the spam account and a deletion of its Discord automated welcome message."
        },
        {
          "name": "Other Features:",
          "value": ".avatar\n\n.big\n\n.gametime\n.help\n.id\n.roll",
          "inline": true
        },
        {
          "name": "How to Use:",
          "value": "• Shows the tagged Discord user's avatar\n   in full size\n• Takes the typed message and displays it\n   typed in lettered emojis\n• Shows the current RuneScape game time\n• Shows a list of available commands\n• Used to collect channel/user/role IDs.\n• Roll x amount of numbers between y and z.\n   x must be less than or equal to 50.",
          "inline": true
        },
        {
          "name": "Server invite Link:",
          "value": "https://discord.gg/qqducRK"
        }
      ]
    }
  };
  message.channel.send(info);
  message.delete();
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Bot Admin",
  guilds: [],
  cooldown: 2500
};

exports.help = {
  name: "dev",
  category: "Info",
  description: "Displays information regarding the **Cygrid Dev** Discord server.",
  usage: "dev"
};
