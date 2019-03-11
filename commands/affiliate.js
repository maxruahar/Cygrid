exports.run = (client, message, [action, cygID, ...args], level) => {

  const settings = client.settings.get(message.guild.id);
  const db = client.affiliates;
  const mcs = (msg) => message.channel.send(msg);
  action = action.toLowerCase();

  if (!action) return mcs("Please specify an action.");

  if (level >= 4 && ["temp", "template"].includes(action)) {
    const e = {
      "embed": {
        "author": {
          "name": "RuneScape Affiliates",
          "url": "https://discord.gg/qqducRK",
          "icon_url": "https://i.imgur.com/8sRFoa6.png"
        },
        "description": `Use the command **${settings.prefix}affiliate <update> <serverID> <field> <newValue>** to update your current affiliate embed.\n\nField = Use the image below to find the letter or name for the field that you will be updating.\n\nNewValue = The text you want to replace the current text with.`,
        "image": {
          "url": "https://i.imgur.com/NPI0ahN.png"
        },
        "color": 11842740,
        "footer": {
          "icon_url": "https://i.imgur.com/6c6q2iC.png",
          "text": `Use ${settings.prefix}help affiliate for more commands`
        }
      }
    };
    mcs(e);
  } else 

  if (["sub", "submit"].includes(action)) {
    const e = {
      "embed": {
        "author": {
          "name": "RuneScape Affiliates",
          "url": "https://discord.gg/qqducRK",
          "icon_url": "https://i.imgur.com/8sRFoa6.png"
        },
        "title": "Click here to submit information for **${message.guild.name}**.",
        "url": "https://docs.google.com/forms/d/e/1FAIpQLSeRUtO6CFH1xfYLDKZK1G4g66Yv0KIpLaKrWdv0jera8IkodA/viewform",
        "color": 11842740,
        "footer": {
          "icon_url": "https://i.imgur.com/6c6q2iC.png",
          "text": `Use ${settings.prefix}help affiliate for more commands`
        }
      }
    };
    mcs(e);
  } else

  if (action == "self") {
    
  } else

  if (action == "link") {

  } else

  if (action == "unlink") {

  } else

  if (action == "display") {

  } else

  if (action == "update") {
    
  }

  else {
    return mcs("exited.");
  }



  /* data structure
  *  {"serverName": "",
  *  "serverDescription": "",
  *  "iconURL": "",
  *  "contact": "",
  *  "invite": "",
  *  "s3Header": "",
  *  "s3Body": "",
  *  "s4Header": "",
  *  "s4Body": "",
  *  "s5Header": "",
  *  "s5Body": "",
  *  "s6Header": "",
  *  "s6Body": "",
  *  "highlight": ""}
  */

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["aff"],
  permLevel: "Bot Admin",
  guilds: [],
  cooldown: 2500
};

exports.help = {
  name: "affiliate",
  category: "Info",
  description: "Display and manage affiliate embeds.",
  usage: `affiliate <submit/self>\naffiliate <link/unlink/display> <ID>\naffiliate <update> <ID> <field> <newValue>`
};
