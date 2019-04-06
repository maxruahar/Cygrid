exports.run = (client, message, [action, cygID, ...args], level) => {

  const table = require("markdown-table");
  const settings = client.settings.get(message.guild.id);
  const db = client.affiliates;
  const affLinks = client.affLinks;
  const affMessages = client.affMessages;
  const affTimestamps = client.affTimestamps;
  const now = Math.floor(+new Date / 1000);
  const mcs = (msg) => message.channel.send(msg);
  action = action ? action.toLowerCase() : undefined;

  const embedify = (guildID, data) => {
    const guild = client.guilds.get(guildID);    
    const final = {"embed": {}};
    const {embed} = final;

    embed.author = {
      "name": "RuneScape Affiliates",
      "url": "https://discord.gg/qqducRK",
      "icon_url": "https://i.imgur.com/8sRFoa6.png"
    };
    embed.title = guild ? guild.name : data.serverName;
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
      ? `__**${data.s3Header}:**__` : `__**${data.s3Header}**__`;
    const s4Header = !data.s4Header ? "" : data.s4Header.slice(-1) !== ":"
      ? `__**${data.s4Header}:**__` : `__**${data.s4Header}**__`;
    const s5Header = !data.s5Header ? "" : data.s5Header.slice(-1) !== ":"
      ? `__**${data.s5Header}:**__` : `__**${data.s5Header}**__`;
    const s6Header = !data.s6Header ? "" : data.s6Header.slice(-1) !== ":"
      ? `__**${data.s6Header}:**__` : `__**${data.s6Header}**__`;
    if (data.s3Header && data.s3Body) embed.fields.push({"name": s3Header, "value": data.s3Body, "inline": true});
    if (data.s4Header && data.s4Body) embed.fields.push({"name": s4Header, "value": data.s4Body, "inline": true});
    if (data.s5Header && data.s5Body) embed.fields.push({"name": s5Header, "value": data.s5Body, "inline": true});
    if (data.s6Header && data.s6Body) embed.fields.push({"name": s6Header, "value": data.s6Body, "inline": true});
    embed.footer = data.highlight
      ? {"icon_url": "https://i.imgur.com/6c6q2iC.png", "text": data.highlight}
      : client.guilds.has(guildID)
        ? {"icon_url": "https://i.imgur.com/6c6q2iC.png", "text": `Embed created for ${guild.name} by the Cygrid team`}
        : {"icon_url": "https://i.imgur.com/6c6q2iC.png", "text": `Embed created for ${data.serverName} by the Cygrid team | Invite to claim and update`}

    return final;
  }

  if (!action) return mcs("Please specify an action.");
  message.delete();

  if (level > 3 && ["temp", "template"].includes(action)) {
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
    if (!db.get(id)) return mcs(`No embed stored for **${message.guild.name}**. Please use **${settings.prefix}affiliate submit** or contact an Admin in the Cygrid Dev server.`);
    mcs(embedify(id, db.get(id)));
  } else

  if ([level > 3 && "d", "pre", "preview"].includes(action)) {
    const guildName = client.guilds.has(cygID) ? `**${client.guilds.get(cygID).name}**` : "that server";
    if (!db.get(cygID)) return mcs(`No embed stored for ${guildName}. Please use **${settings.prefix}affiliate submit** or contact an Admin in the Cygrid Dev server.`);
    mcs(embedify(cygID, db.get(cygID)));
  } else

  if (["p", "post"].includes(action)) {
    const guildName = client.guilds.has(cygID) ? `**${client.guilds.get(cygID).name}**` : "that server";
    if (!db.get(cygID)) return mcs(`No embed stored for ${guildName}. Please use **${settings.prefix}affiliate submit** or contact an Admin in the Cygrid Dev server.`);
    if (!affMessages.has(cygID)) affMessages.set(cygID, {});
    if (Object.getOwnPropertyNames(affMessages.get(cygID)).includes(message.guild.id)) return mcs(`An embed for ${guildName} has already been posted in **${message.guild.name}**.`);
    mcs(embedify(cygID, db.get(cygID)))
      .then(m => {
        const embedGuilds = affMessages.get(cygID);
        embedGuilds[m.guild.id] = [m.guild.id, m.channel.id, m.id];
        affMessages.set(cygID, embedGuilds);
      });
  } else

  if (["log"].includes(action)) {
    if (level > 3 && cygID && !db.has(cygID)) return mcs("No embed stored for that server. Please use **${settings.prefix}affiliate submit** or contact an Admin in the Cygrid Dev server.");
    const guildName = level > 3 && cygID
      ? db.get(cygID).serverName
      : db.get(message.guild.id).serverName;
    const iconURL = level > 3 && cygID
      ? db.get(cygID).iconURL
      : message.guild.iconURL
    if (level > 3 && cygID && !client.affMessages.has(cygID) || !client.affMessages.get(message.guild.id))
      return mcs (`There are currently no servers with **${guildName}** affiliate embed.`);
    const guilds = level > 3 && cygID
      ? Object.getOwnPropertyNames(client.affMessages.get(cygID))
      : Object.getOwnPropertyNames(client.affMessages.get(message.guild.id));
    if (guilds.length < 1) return mcs(`There are currently no servers with **${guildName}** affiliate embed.`);
    let response = "";
    guilds.forEach(g => {
      const nam = client.guilds.get(g).name;
      const inv = client.guilds.get(g).invite
        ? client.guilds.get(g).invite
        : db.get(g)
          ? db.get(g).invite
          : "";
      const add = inv
        ? `• [${nam}](${inv})\n`
        : `• ${nam}\n`;
      response += add;
    });
    const e = {
      "embed": {
        "author": {
          "name": "RuneScape Affiliates",
          "url": "https://discord.gg/qqducRK",
          "icon_url": "https://i.imgur.com/8sRFoa6.png"
          },
        "title": `Servers with **${guildName}** affiliate embed:`,
        "description": response,
        "thumbnail": {"url": iconURL},
        "color": 12500670,
        "footer": {
          "icon_url": "https://i.imgur.com/6c6q2iC.png",
          "text": `Use ${settings.prefix}help affiliate for more commands`
          }
        }
      }
    mcs(e);
  } else

  if (["l", "link"].includes(action)) {
    if (!cygID) return mcs("Please specify a server ID to link.");
    const target = db.has(cygID)
      ? db.get(cygID)
      : client.guilds.has(cygID)
        ? client.guilds.get(cygID)
        : {"name": "that server"};
    const targetName = target.serverName
      ? `**${target.serverName}**`
      : target.name !== "that server"
        ? `**${target.name}**`
        : target.name;
    if (!db.has(cygID)) return mcs(`No embed stored for **${targetName}**. Please use **${settings.prefix}affiliate submit** or contact an Admin in the Cygrid Dev server.`);
    const id = level > 3 && args[0] ? args[0] : message.guild.id;
    if (id == cygID) return mcs("Servers may not be linked to themselves.");
    const currName = db.has(id)
      ? `**${db.get(id).serverName}**`
      : client.guilds.has(id)
        ? `**${client.guilds.get(id).name}**`
        : "that server";
    if (!affLinks.has(id)) client.affLinks.set(id, []);
    const links = affLinks.get(id);
    if (links.includes(cygID)) return mcs(`${targetName} is already linked to ${currName}.`);
    if (!links.includes(cygID)) {
      links.push(cygID);
      affLinks.set(id, links);
      return mcs(`${targetName} has been linked to ${currName}.`);
    }
  } else

  if (["u", "unlink"].includes(action)) {
    if (!cygID) return mcs("Please specify a server ID to unlink.");
    const target = db.has(cygID)
      ? db.get(cygID)
      : client.guilds.has(cygID)
        ? client.guilds.get(cygID)
        : {"name": "that server"};
    const targetName = target.serverName
      ? `**${target.serverName}**`
      : target.name !== "that server"
        ? `**${target.name}**`
        : target.name;
    if (!db.has(cygID)) return mcs(`No embed stored for **${targetName}**. Please use **${settings.prefix}affiliate submit** or contact an Admin in the Cygrid Dev server.`);
    const id = level > 3 && args[0] ? args[0] : message.guild.id;
    if (id == cygID) return mcs("Servers may not be linked to themselves.");
    const currName = db.has(id)
      ? `**${db.get(id).serverName}**`
      : client.guilds.has(id)
        ? `**${client.guilds.get(id).name}**`
        : "that server";
    if (!affLinks.has(id)) client.affLinks.set(id, []);
    let links = affLinks.get(id);
    if (!links.includes(cygID)) return mcs(`${targetName} is not linked to ${currName}.`);
    if (links.includes(cygID)) {
      links = links.filter(l => l !== cygID);
      affLinks.set(id, links);
      return mcs(`${targetName} has been unlinked from ${currName}.`);
    }
  } else

  if (["e", "edit"].includes(action)) {
    const e = {
      "embed": {
        "author": {
          "name": "RuneScape Affiliates",
          "url": "https://discord.gg/qqducRK",
          "icon_url": "https://i.imgur.com/8sRFoa6.png"
        },
        "description": `Use the field name or reference letter listed below to choose which property of your embed to edit.\n\n__Syntax:__\n**${settings.prefix}affiliate edit <serverID> <field> <newValue>**\n\n__Examples:__\n**${settings.prefix}affiliate edit 433447855127003157 A Cygrid Dev**\n**${settings.prefix}affiliate edit 433447855127003157 serverName Cygrid Dev**\n\n\n Both of these commands would edit the serverName property of my embed to be Cygrid Dev.`,
        "image": {
          "url": "https://i.imgur.com/KpVt6db.png"
        },
        "color": 12500670,
        "footer": {
          "icon_url": "https://i.imgur.com/6c6q2iC.png",
          "text": `Use ${settings.prefix}help affiliate for more commands`
        }
      }
    };
    if (!cygID) return mcs(e);
    if(!db.has(cygID)) return mcs("No embed stored for that server. Please use **${settings.prefix}affiliate submit** or contact an Admin in the Cygrid Dev server.");
    const affEmbed = db.get(cygID);
    const adminRole = client.guilds.get(cygID).roles.find(r => r.name == client.settings.get(cygID).adminRole)
      ? client.guilds.get(cygID).roles.find(r => r.name == client.settings.get(cygID).adminRole).id
      : "";
    if (message.author.id !== client.settings.get(cygID).ownerID
      && !client.guilds.get(cygID).members.get(message.author.id).roles.has(adminRole)
      && level < 4) return mcs(`You do not have permission to edit the embed for **${affEmbed.serverName}**.`);
    let field = args[0];
    if (!field) return mcs("Please specify a field to update.")
    const value = args.slice(1).join(" ");
    const aliases = {
      "a": "serverName",
      "b": "serverDescription",
      "c": "iconURL",
      "d": "contact",
      "e": "invite",
      "f": "s3Header",
      "g": "s3Body",
      "h": "s4Header",
      "i": "s4Body",
      "j": "s5Header",
      "k": "s5Body",
      "l": "s6Header",
      "m": "s6Body",
      "n": "serverHighlight"
    };
    if (Object.getOwnPropertyNames(aliases).includes(field.toLowerCase())) field = aliases[field.toLowerCase()];
    if (!Object.values(aliases).includes(field))
      return mcs(`Invalid field specified. Use **${settings.prefix}affiliate update** to learn more.`);
    if (!value) return mcs(`Please specify a value to update the **${field}** field with.`);
    switch (field) {
      case "serverName":
        if (value.length > 256) return mcs(`The **${field}** field has a character limit of **256** characters.`);
        break;
      case "serverDescription":
        if (value.length > 2048) return mcs(`The **${field}** field has a character limit of **2048** characters.`);
        break;
      case "iconURL":
        if (!/(http(s?):)([/|.|\w|\s|-])*\.(?:jpe?g|gif|png|webp\??)/gi.test(value)) return mcs(`The **${field}** requires a valid image URL ending in one of the following file extensions:\n• jpg/jpeg\n• png\n• gif\n• webp`);
        break;
      case "contact":
        if (!/^<@!?\d{17,18}>( or <@!?\d{17,18}>)?$/.test(value)) return mcs(`The **${field}** field requires one or two valid Discord mentions. Formatting should be as follows:\nOne contact: "\<@0123456789>"\nTwo contacts: "\<@0123456789> or \<@0123456789>"`);
        if (value.length > 1024) return mcs(`The **${field}** field has a character limit of **1024** characters.`);
        break;
      case "invite":
        if (!/https?:\/{2}discord.gg\/\w+/i.test(value)) return mcs(`The **${field}** field must be a valid **permanent** Discord invite link.`);
        if (value.length > 1024) return mcs(`The **${field}** field has a character limit of **1024** characters.`);
        break;
      case "s3Header":
        if (value.length > 256) return mcs(`The **${field}** field has a character limit of **256** characters.`);
        break;
      case "s3Body":
        if (value.length > 1024) return mcs(`The **${field}** field has a character limit of **1024** characters.`);
        break;
      case "s4Header":
        if (value.length > 256) return mcs(`The **${field}** field has a character limit of **256** characters.`);
        break;
      case "s4Body":
        if (value.length > 1024) return mcs(`The **${field}** field has a character limit of **1024** characters.`);
        break;
      case "s5Header":
        if (value.length > 256) return mcs(`The **${field}** field has a character limit of **256** characters.`);
        break;
      case "s5Body":
        if (value.length > 1024) return mcs(`The **${field}** field has a character limit of **1024** characters.`);
        break;
      case "s6Header":
        if (value.length > 256) return mcs(`The **${field}** field has a character limit of **256** characters.`);
        break;
      case "s6Body":
        if (value.length > 1024) return mcs(`The **${field}** field has a character limit of **1024** characters.`);
        break;
      case "highlight":
        if (!value.includes("|")) return mcs(`The **${field}** field should consist of short key points of your server separated by the **|** character.`);
        if (value.length > 2048)  return mcs(`The **${field}** field has a character limit of **2048** characters.`);
        break;
    }
    affEmbed[field] = value;
    db.set(cygID, affEmbed);
    const eUpdate = {
      "embed": {
        "author": {
          "name": "RuneScape Affiliates",
          "url": "https://discord.gg/qqducRK",
          "icon_url": "https://i.imgur.com/8sRFoa6.png"
          },
        "title": `**${affEmbed.serverName}** affiliate embed updated:`,
        "description": `The **${field}** field was updated to the following:\n\`\`\`${value}\`\`\``,
        "thumbnail": {"url": affEmbed.iconURL},
        "color": 12500670,
        "footer": {
          "icon_url": "https://i.imgur.com/6c6q2iC.png",
          "text": `Edited by ${message.author.username} in ${message.guild.name}`
          }
        }
      };
    client.guilds.get("433447855127003157").channels.get("563874508625281024").send(eUpdate);

  }

  else 

  if (["up", "update"].includes(action)) {
    // Compare timestamps on lastUpdate for cooldown
    const lastUpdate = affTimestamps.has(cygID) ? affTimestamps.get(cygID) : "1546300800";
    const diff = now - lastUpdate;
    if (diff <= 3600) {}

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
