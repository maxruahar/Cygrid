module.exports = async client => {

  const Parser = require("rss-parser");
  const parser = new Parser();
  const Discord = require("discord.js");

  let x;
  await client.wait(1000);
  console.log(`Ready: ${client.user.tag}, ready to serve ${client.users.size} users in ${client.guilds.size} servers.`);
  client.user.setActivity(`over ${client.guilds.size} servers`, {type: "WATCHING"});
  client.guilds.filter(g => !client.settings.has(g.id)).forEach(g => client.settings.set(g.id, client.config.defaultSettings));
  client.guilds.forEach(async g => {
    if (g.me.hasPermission("MANAGE_GUILD")) {
      if (await g.fetchInvites().then(invites => invites.size) == 1) {
        x = await g.fetchInvites().then(invs => invs.first().code);
      } else if (await g.fetchInvites().then(invites => invites.size) > 1) {
        x = await g.fetchInvites().then(invs => invs.sort((a, b) => a.uses - b.uses).last().code);
      }
      g.invite = `https://discord.gg/${x}`;
    }
  });




  setInterval(news, 5 * 60 * 1000);

  const news = async () => {

    const feed = await parser.parseURL("https://secure.runescape.com/m=news/latest_news.rss");
    const curr = feed.items.map(i => i.guid);
    const prev = client.data.get("lastNews");

    if (curr.length === prev.length &&
      curr.filter(e => !prev.includes(e)).length < 1) return console.log("No change to RS game news.");

    const diff = curr.filter(e => !prev.includes(e));


    const embedify = (item) => {

      const guilds = client.guilds.keyArray().filter(g => client.settings.get(g).newsChannel);
      const channels = guilds.map(g => client.settings.get(g).newsChannel);
      const messages = guilds.map(g => client.settings.get(g).newsMessage);
      const mapped = {};
      channels.forEach((key, i) => mapped[key] = messages[i]);

      if (typeof item !== "object") return;
      const {title, link, enclosure, contentSnippet, categories} = item;
      const url = enclosure ? enclosure.url : "https://i.imgur.com/I5knNmF.jpg";
      const e = new Discord.RichEmbed()
        .setTitle(title)
        .setDescription(contentSnippet)
        .setURL(link)
        .setColor([255, 254, 255])
        .setImage(url)
        .setFooter(categories[0])
        .setTimestamp();

      channels.forEach((c, i) => {
        client.channels.get(c).send(messages[i], e);
      });
    };

    diff.forEach(i => {
      const item = feed.items[curr.indexOf(i)];
      embedify(item);
    });


    client.data.set("lastNews", curr);

  };



  //client.channels.find("id", client.rebootChannel).send(`${client.user.tag}, ready to serve ${client.users.size} users.`);
  //client.rebootChannel = "";

  /*      const request = require('request');
        const name = "runescape";
        let stream, diff;
        const options = {
                url: `https://api.twitch.tv/kraken/streams/${name}`,
                headers: {
                        'Client-ID': 'vyxo0jjtz4zpjr3tc6k122qlz8iaxd'
                }
        };
        const callback (error, response, body) =>  {
                if (stream == "null" && stream !== body.stream) {
                        //add all guilds to array, check each guild for streaming enabled and send to logChannel for server.
                        client.channels.get('398676006325452801').send(`**${name.toProperCase()}** is now streaming! Head to https://twitch.tv/${name} to tune in.`);
                }
                stream = body.stream;
        }
        request(options, callback);

        const update = () => {
                if (stream == "null") request(options, callback);
                if (
        }*/


//  const int = setInterval(update, 60000);
};
