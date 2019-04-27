exports.run = async (client, message, [action, cygID, ...args], level) => {

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
      : guild.me.hasPermission(32)
        ? {"url": guild.iconURL.replace(/(?:jpe?g|gif|webp\??)/gi, "png")}
        : {"url": data.iconURL};
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
  if (!["e", "edit"].includes(action)) message.delete();

  if (level > 1 && ["sub", "submit"].includes(action)) {
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

  if (level > 0 && ["s", "self"].includes(action)) {
    const id = message.guild.id;
    if (!db.has(id)) return mcs(`No embed stored for **${message.guild.name}**. Please use **${settings.prefix}affiliate submit** or contact an Admin in the Cygrid Dev server.`);
    mcs(embedify(id, db.get(id)));
  } else

  if (level > 0 && ["d", "display", "pre", "preview"].includes(action)) {
    if (!cygID) return mcs("Please specify a server ID to display.");
    const guildName = client.guilds.has(cygID) ? `**${client.guilds.get(cygID).name}**` : "that server";
    if (!db.get(cygID)) return mcs(`No embed stored for ${guildName}. Please use **${settings.prefix}affiliate submit** or contact an Admin in the Cygrid Dev server.`);
    mcs(embedify(cygID, db.get(cygID)));
  } else

  if (level > 1 && ["p", "post"].includes(action)) {
    if (!cygID) return mcs("Please specify a server ID to post or use the **all** keyword to post all linked affiliate embeds.");
    if (cygID !== "all") {
      const guildName = client.guilds.has(cygID) ? `**${client.guilds.get(cygID).name}**` : "that server";
      if (!db.has(cygID)) return mcs(`No embed stored for ${guildName}. Please use **${settings.prefix}affiliate submit** or contact an Admin in the Cygrid Dev server.`);
      if (!affLinks.get(message.guild.id).includes(cygID)) return mcs(`Please link ${guildName} to **${message.guild.name}** before attempting to post their affiliate embed. Refer to the <#557258619482275860> (#affiliate-faqs) channel in the Cygrid Dev server for information about linking servers.`);
      if (!affMessages.has(cygID)) affMessages.set(cygID, {});
      if (Object.getOwnPropertyNames(affMessages.get(cygID)).includes(message.guild.id)) return mcs(`An embed for ${guildName} has already been posted in **${message.guild.name}**.`);
      mcs(embedify(cygID, db.get(cygID)))
        .then(m => {
          const embedGuilds = affMessages.get(cygID);
          embedGuilds[m.guild.id] = [m.guild.id, m.channel.id, m.id];
          affMessages.set(cygID, embedGuilds);
        });
    } else
    if (cygID == "all") {
      const links = affLinks.get(message.guild.id).sort((a, b) => db.get(a).serverName.localeCompare(db.get(b).serverName));
      if (links.length < 1) return mcs(`There are currently no servers linked to **${message.guild.name}**. Please refer to the <#557258619482275860> (#affiliate-faqs) channel in the Cygrid Dev server for information about linking servers.`);
      let i = 0;
      let errs = [`The following embeds returned errors when attempting to post them:`];
      const postEmbeds = async (guildIDs) => {
        for (const guildID of guildIDs) {
          try {
            const guildName = db.has(guildID) ? `**${db.get(guildID).serverName}**` : "that server";
            if (!db.has(guildID)) {
              errs.push(`${guildID}: No embed stored for ${guildName}.`);
            } else {
              if (!affMessages.has(guildID)) affMessages.set(guildID, {});
              if (Object.getOwnPropertyNames(affMessages.get(guildID)).includes(message.guild.id)) {
                errs.push(`${guildID}: An embed for ${guildName} has already been posted in **${message.guild.name}**.`);
              } else {
                mcs(embedify(guildID, db.get(guildID)))
                  .then(m => {
                    const embedGuilds = affMessages.get(guildID);
                    embedGuilds[m.guild.id] = [m.guild.id, m.channel.id, m.id];
                    affMessages.set(guildID, embedGuilds);
                  });
                i++;
                await client.wait(1000);
              }
            }
          }
          catch (e) {
            errs.push(`${guildID}: **${db.get(guildID).serverName}**`);
          }
        }
      }
      await postEmbeds(links);
      const eUpdate = {
        "embed": {
          "author": {
            "name": "RuneScape Affiliates",
            "url": "https://discord.gg/qqducRK",
            "icon_url": "https://i.imgur.com/8sRFoa6.png"
            },
          "title": `Posting all **${message.guild.name}** affiliate embeds:`,
          "description": `**${i}/${links.length}** linked server affiliate embeds for **${message.guild.name}** were successfully posted.`,
          "thumbnail": {"url": message.guild.iconURL},
          "timestamp": Date.now(),
          "color": 12500670,
          "footer": {
            "icon_url": "https://i.imgur.com/6c6q2iC.png",
            "text": `Posted by ${message.author.tag} in ${message.guild.name}`
          }
        }
      };
      if (errs.length > 1) {
        errs.push(`Any embeds which could not be posted should be reported to an Admin or above in the Cygrid Dev server.`);
        eUpdate.embed.description = `**${i}/${links.length}** linked server affiliate embeds for **${message.guild.name}** were successfully posted. ${errs.join("\n")}`;
      }
      errs.length > 1
        ? mcs(`**${i}/${links.length}** linked server affiliate embeds for **${message.guild.name}** were successfully posted. ${errs.join("\n")}`)
        : mcs(`**${i}/${links.length}** linked server affiliate embeds for **${message.guild.name}** were successfully posted.`);
      client.guilds.get("433447855127003157").channels.get("563874508625281024").send(eUpdate);
    }
  } else

  if (level > 1 && ["un", "unpost"].includes(action)) {
    const id = level > 3 && cygID ? cygID : message.guild.id;
    if (!db.has(id)) return mcs(`No embed stored for that server. Please use **${settings.prefix}affiliate submit** or contact an Admin in the Cygrid Dev server.`);
    const guildName = db.get(id).serverName;
    if (!affLinks.has(id) || affLinks.has(id) && affLinks.get(id).length < 1) return mcs(`There are currently no servers linked to **${guildName}**. Please refer to the <#557258619482275860> (#faqs) channel in the Cygrid Dev server for information about linking servers.`);
    const iconURL = db.get(id).iconURL;
    const guilds = affMessages.keyArray().filter(g => Object.getOwnPropertyNames(affMessages.get(g)).includes(id));
    if (guilds.length < 1) return mcs(`There are currently no linked affiliate embeds posted in **${guildName}**.`);
    let i = 0;
    let errs = [`The following posts returned errors when attempting to fetch the posted affiliate embed:`];

    const removeMessages = async (guildIDs) => {
      for (const guildID of guildIDs) {
        try {
          const rec = client.affMessages.get(guildID);
          const [g,c,m] = rec[id];
          const msg = await client.guilds.get(g).channels.get(c).fetchMessage(m);
          msg.delete();
          delete rec[id];
          client.affMessages.set(guildID, rec);
          i++;
        }
        catch (e) {
          errs.push(`${guildID}: **${db.get(guildID).serverName}**`);
          const rec = client.affMessages.get(guildID);
          delete rec[id];
          client.affMessages.set(guildID, rec);
        }
      }
    }
      await removeMessages(guilds);
      const eUpdate = {
        "embed": {
          "author": {
            "name": "RuneScape Affiliates",
            "url": "https://discord.gg/qqducRK",
            "icon_url": "https://i.imgur.com/8sRFoa6.png"
            },
          "title": `Unposting **${guildName}** linked server affiliate embeds:`,
          "description": `**${i}/${guilds.length}** linked server affiliate embeds have been unposted and removed from **${guildName}**.`,
          "thumbnail": {"url": iconURL},
          "timestamp": Date.now(),
          "color": 12500670,
          "footer": {
            "icon_url": "https://i.imgur.com/6c6q2iC.png",
            "text": `Unposted by ${message.author.tag} in ${message.guild.name}`
          }
        }
      };
    if (errs.length > 1) {
      errs.push(`You may now post linked server affiliate embeds again using **${settings.prefix}affiliate post**.`);
      eUpdate.embed.description = `**${i}/${guilds.length}** linked server affiliate embeds have been unposted and removed from **${guildName}**. ${errs.join("\n")}`;
    }
    errs.length > 1
      ? mcs(`**${i}/${guilds.length}** linked server affiliate embeds have been unposted and removed from **${guildName}**. ${errs.join("\n")}`)
      : mcs(`**${i}/${guilds.length}** linked server affiliate embeds have been unposted and removed from **${guildName}**.`);
    client.guilds.get("433447855127003157").channels.get("563874508625281024").send(eUpdate);


  } else 

  if (level > 1 && ["log"].includes(action)) {
    if (level > 3 && cygID && !db.has(cygID)) return mcs(`No embed stored for that server. Please use **${settings.prefix}affiliate submit** or contact an Admin in the Cygrid Dev server.`);
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
    const response = guilds.map(g => {
      const nam = client.guilds.get(g).name;
      const inv = client.guilds.get(g).invite
        ? client.guilds.get(g).invite
        : db.get(g)
          ? db.get(g).invite
          : "";
      const add = inv
        ? `[${nam}](${inv})`
        : `${nam}`;
      return add;
    }).sort().join("\n• ");
    const e = {
      "embed": {
        "author": {
          "name": "RuneScape Affiliates",
          "url": "https://discord.gg/qqducRK",
          "icon_url": "https://i.imgur.com/8sRFoa6.png"
          },
        "title": `Servers with **${guildName}** affiliate embed:`,
        "description": `• ${response}`,
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

  if (level > 1 && ["links"].includes(action)) {
    const id = level > 3 && cygID ? cygID : message.guild.id;
    if (!db.has(id)) return mcs(`No embed stored for that server. Please use **${settings.prefix}affiliate submit** or contact an Admin in the Cygrid Dev server.`);
    const guildName = db.get(id).serverName;
    const iconURL = db.get(id).iconURL;
    const links = affLinks.get(id);
    if (links.length < 1) return mcs(`There are currently no servers linked to **${guildName}**. Please refer to the <#557258619482275860> (#faqs) channel in the Cygrid Dev server for information about linking servers.`);
    const response = client.affLinks.get(id).map(g => db.get(g).serverName).sort().join("\n• ");
    const e = {
      "embed": {
        "author": {
          "name": "RuneScape Affiliates",
          "url": "https://discord.gg/qqducRK",
          "icon_url": "https://i.imgur.com/8sRFoa6.png"
          },
        "title": `Servers linked to **${guildName}**:`,
        "description": `• ${response}`,
        "thumbnail": {"url": iconURL},
        "color": 12500670,
        "footer": {
          "icon_url": "https://i.imgur.com/6c6q2iC.png",
          "text": `Use ${settings.prefix}help affiliate for more commands`
        }
      }
    };
    mcs(e);      
  } else 

  if (level > 1 && ["l", "link"].includes(action)) {
    if (!cygID) return mcs("Please specify a server ID to link.");
    if (!db.has(cygID)) return mcs(`No embed stored for **${targetName}**. Please use **${settings.prefix}affiliate submit** or contact an Admin in the Cygrid Dev server.`);
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
    const id = level > 3 && args[0] ? args[0] : message.guild.id;
    if (id == cygID) return mcs("Servers may not be linked to themselves.");
    const currName = db.has(id)
      ? `**${db.get(id).serverName}**`
      : client.guilds.has(id)
        ? `**${client.guilds.get(id).name}**`
        : "that server";
    if (!affLinks.has(id)) client.affLinks.set(id, []);
    const links = affLinks.get(id);
    if (id !== "433447855127003157" && !links.includes("433447855127003157")) links.push("433447855127003157");
    if (links.includes(cygID)) return mcs(`${targetName} is already linked to ${currName}.`);
    if (!links.includes(cygID)) {
      links.push(cygID);
      affLinks.set(id, links);
      return mcs(`${targetName} has been linked to ${currName}.`);
    }
  } else

  if (level > 1 && ["u", "unlink"].includes(action)) {
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

  if (level > 1 && ["e", "edit"].includes(action)) {
    const e = {
      "embed": {
        "author": {
          "name": "RuneScape Affiliates",
          "url": "https://discord.gg/qqducRK",
          "icon_url": "https://i.imgur.com/8sRFoa6.png"
        },
        "description": `Use the field name or reference letter listed below to choose which property of your embed to edit. You may also use **here** in place of a serverID to make changes to the embed for the server that you are using the commands in.\n\n__Syntax:__\n**${settings.prefix}affiliate edit <serverID> <field> <newValue>**\n\n__Examples:__\n**${settings.prefix}affiliate edit 433447855127003157 A Cygrid Dev**\n**${settings.prefix}affiliate edit 433447855127003157 serverName Cygrid Dev**\n\n\n Both of these commands would edit the serverName property of my embed to be Cygrid Dev.`,
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
    cygID = cygID == "here" ? message.guild.id : cygID;
    if (!db.has(cygID)) return mcs(`No embed stored for that server. Please use **${settings.prefix}affiliate submit** or contact an Admin in the Cygrid Dev server.`);
    const affEmbed = db.get(cygID);
    const adminRole = !client.guilds.has(cygID)
      ? ""
      : client.guilds.get(cygID).roles.find(r => r.name == client.settings.get(cygID).adminRole)
        ? client.guilds.get(cygID).roles.find(r => r.name == client.settings.get(cygID).adminRole).id
        : "";
    const isOwner = !client.guilds.has(cygID)
      ? ""
      : message.author.id == client.settings.get(cygID).ownerID;
    const isAdmin = !client.guilds.has(cygID)
      ? ""
      : client.guilds.get(cygID).members.get(message.author.id).roles.has(adminRole);
    if (!isOwner
      && !isAdmin
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
      "n": "highlight"
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
    mcs(`The **${field}** field for **${affEmbed.serverName}** was updated to the following:\n\`\`\`${value}\`\`\``);
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
        "timestamp": Date.now(),
        "color": 12500670,
        "footer": {
          "icon_url": "https://i.imgur.com/6c6q2iC.png",
          "text": `Edited by ${message.author.tag} in ${message.guild.name}`
          }
        }
      };
    client.guilds.get("433447855127003157").channels.get("563874508625281024").send(eUpdate);

  }

  else 

  if (level > 1 && ["up", "update"].includes(action)) {
    cygID = cygID ? cygID : message.guild.id;
    if (!db.has(cygID)) return mcs(`No embed stored for that server. Please use **${settings.prefix}affiliate submit** or contact an Admin in the Cygrid Dev server.`);
    const lastUpdate = affTimestamps.has(cygID) ? affTimestamps.get(cygID) : "1546300800";
    const diff = now - lastUpdate;
    if (level < 4 && diff <= 3600) return mcs(`Updating embeds has a cooldown of 1 hour, please wait another **${Math.ceil(diff/60)}** minutes to try again.`);
    const affEmbed = db.get(cygID);
    const adminRole = !client.guilds.get(cygID)
      ? ""
      : client.guilds.get(cygID).roles.find(r => r.name == client.settings.get(cygID).adminRole)
        ? client.guilds.get(cygID).roles.find(r => r.name == client.settings.get(cygID).adminRole).id
        : "";
    const isOwner = !client.guilds.has(cygID)
      ? ""
      : message.author.id == client.settings.get(cygID).ownerID;
    const isAdmin = !client.guilds.has(cygID)
      ? ""
      : client.guilds.get(cygID).members.get(message.author.id).roles.has(adminRole);
    if (!isOwner
      && !isAdmin
      && level < 4) return mcs(`You do not have permission to update the embed for **${affEmbed.serverName}**.`);
    if (!client.affMessages.has(cygID)) client.affMessages.set(cygID, {})
    const guilds = Object.getOwnPropertyNames(client.affMessages.get(cygID));
    if (guilds.length < 1) return mcs(`There are currently no servers with the **${affEmbed.serverName}** affiliate embed.`);
    let i = 0;
    let errs = [`The following servers returned errors when attempting to fetch the posted affiliate embed:`];
    const checkMessages = async (guildIDs) => {
      for (const guildID of guildIDs) {
        try {
          const [g,c,m] = client.affMessages.get(cygID)[guildID];
          const msg = await client.guilds.get(g).channels.get(c).fetchMessage(m);
          msg.edit(embedify(cygID, db.get(cygID)));
          i++;
        }
        catch (e) {
          errs.push(`${guildID}: **${client.guilds.get(guildID).name}**`);
          const rec = client.affMessages.get(cygID);
          delete rec[guildID];
          client.affMessages.set(cygID, rec);
        }
      }
    }
    await checkMessages(guilds);
    affTimestamps.set(cygID, now);
    const eUpdate = {
      "embed": {
        "author": {
          "name": "RuneScape Affiliates",
          "url": "https://discord.gg/qqducRK",
          "icon_url": "https://i.imgur.com/8sRFoa6.png"
          },
        "title": `**${affEmbed.serverName}** affiliate embed updated:`,
        "description": `The affiliate embed for **${affEmbed.serverName}** was successfully updated in **${i}/${guilds.length}** servers.`,
        "thumbnail": {"url": affEmbed.iconURL},
        "timestamp": Date.now(),
        "color": 12500670,
        "footer": {
          "icon_url": "https://i.imgur.com/6c6q2iC.png",
          "text": `Updated by ${message.author.tag} in ${message.guild.name}`
        }
      }
    };
    if (errs.length > 1) {
      errs.push(`Any servers where messages could not be found will need to have the **${affEmbed.serverName}** affiliate embed reposted.`);
      eUpdate.embed.description = `The affiliate embed for **${affEmbed.serverName}** was updated in **${i}/${guilds.length}** servers. ${errs.join("\n")}`;
    }
    errs.length > 1
      ? mcs(`The affiliate embed for **${affEmbed.serverName}** was updated in **${i}/${guilds.length}** servers. ${errs.join("\n")}`)
      : mcs(`The affiliate embed for **${affEmbed.serverName}** was updated in **${i}/${guilds.length}** servers.`);
    client.guilds.get("433447855127003157").channels.get("563874508625281024").send(eUpdate);
  }

  else {
    return;
  }
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
  usage: `affiliate <links/log/self/submit/update>\n       affiliate <display/link/unlink> <ID>\n       affiliate <post> <ID/all>\n       affiliate <edit> <ID> <field> <newValue>`
};