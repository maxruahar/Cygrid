exports.run = (client, message, [action, cygID, ...args], level) => {

  const settings = client.settings.get(message.guild.id);
  const db = client.affiliates;
  const mcs = (msg) => message.channel.send(msg);
  action = action.toLowerCase();

  const embedify = (guildID, data) => {
    const guild = client.guilds.get(guildID);    
    const final = {"embed": {}};
    const {embed} = final;

    embed.author = {
      "name": "RuneScape Affiliates",
      "url": "https://discord.gg/qqducRK",
      "icon_url": "https://i.imgur.com/8sRFoa6.png"
    };
    embed.title = data.serverName;
    embed.url = data.invite;
    embed.description = data.serverDescription;
    embed.thumbnail = !guild ? {"url": data.iconURL}
      : guild.me.hasPermission(32) && !data.iconURL
      ? {"url": guild.iconURL} : {"url": data.iconURL};
    embed.color = 12500670;
    embed.fields = [
      {"name": "__**Contact:**__", "value": data.contact, "inline": true},
      {"name": "__**Invite:**__", "value": data.invite, "inline": true}
    ];
    const s3Header = !data.s3Header ? "" : data.s3Header.slice(-1) !== ":"
      ? `**${data.s3Header}:**` : `**${data.s3Header}**`;
    const s4Header = !data.s4Header ? "" : data.s4Header.slice(-1) !== ":"
      ? `**${data.s4Header}:**` : `**${data.s4Header}**`;
    const s5Header = !data.s5Header ? "" : data.s5Header.slice(-1) !== ":"
      ? `**${data.s5Header}:**` : `**${data.s5Header}**`;
    const s6Header = !data.s6Header ? "" : data.s6Header.slice(-1) !== ":"
      ? `**${data.s6Header}:**` : `**${data.s6Header}**`;
    if (data.s3Header && data.s3Body) embed.fields.push({"name": s3Header, "value": data.s3Body, "inline": true});
    if (data.s4Header && data.s4Body) embed.fields.push({"name": s4Header, "value": data.s4Body, "inline": true});
    if (data.s5Header && data.s5Body) embed.fields.push({"name": s5Header, "value": data.s5Body, "inline": true});
    if (data.s6Header && data.s6Body) embed.fields.push({"name": s6Header, "value": data.s6Body, "inline": true});
    embed.footer = {"icon_url": "https://i.imgur.com/6c6q2iC.png", "text": data.highlight}

    return final;
  }

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
        "color": 12500670,
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
        "title": `Click here to submit information for **${message.guild.name}**.`,
        "url": "https://docs.google.com/forms/d/e/1FAIpQLSeRUtO6CFH1xfYLDKZK1G4g66Yv0KIpLaKrWdv0jera8IkodA/viewform",
        "color": 12500670,
        "footer": {
          "icon_url": "https://i.imgur.com/6c6q2iC.png",
          "text": `Use ${settings.prefix}help affiliate for more commands`
        }
      }
    };
    mcs(e);
  } else

  if (["s", "self"].includes(action)) {
    const id = message.guild.id;
    if (!db.get(id)) return mcs(`No embed stored for **${message.guild.name}**.`);
    mcs(embedify(id, db.get(id)));
  } else

  if (["d", "display"].includes(action)) {
    const guildName = client.guilds.get(cygID) ? `**${client.guilds.get(cygID).name}**` : "that server";
    if (!db.get(cygID)) return mcs(`No embed stored for ${guildName}.`);
    mcs(embedify(cygID, db.get(cygID)));
  } else

  if (["l", "link"].includes(action)) {

  } else

  if (["u", "unlink"].includes(action)) {

  } else

  if (["up", "update"].includes(action)) {
    
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
  usage: `affiliate <submit/self>\n       affiliate <link/unlink/display> <ID>\n       affiliate <update> <ID> <field> <newValue>`
};
