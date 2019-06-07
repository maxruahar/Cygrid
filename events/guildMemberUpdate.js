module.exports = async (client, oldMember, newMember) => {
	const Discord = require('discord.js');
	const guild = newMember.guild;
	const settings = client.settings.get(guild.id);
	const logChannel = guild.channels.get(settings.logChannel);  // settings.nitroBooster
	const boostChannel = client.channels.find(c => c.id == settings.boostChannel || c.name == settings.boostChannel);
	const booster = guild.roles.find(r => r.managed && r.name == settings.nitroBooster || r.managed && r.id == settings.nitroBooster);

	if (!booster) return;
	if (!oldMember.roles.has(booster.id) && newMember.roles.has(booster.id)) {
		if (!boostChannel && booster) return logChannel.send(`Please set a valid channel name or ID under the nitroChannel setting for **${guild.name}**. This can be done using **.set edit nitroChannel <name/id>**.`);

		let embed = new Discord.RichEmbed()
		.setAuthor("New Nitro Booster!", "https://i.imgur.com/o6DaZI5.png")
		.setTitle(`${newMember.displayName} has contributed a Nitro boost to the server!`)
		.setDescription(`There are now **${guild.members.filter(m => m.roles.has(booster.id)).size}** members giving a Nitro boost to ${guild.name}!\n\nBoosting servers with Discord Nitro is a monthly process that helps to unlock new features for the server. [Read more here](https://support.discordapp.com/hc/en-us/articles/360028038352).`)
		.setColor(14045922)
		.setThumbnail(newMember.user.displayAvatarURL)
		.setFooter(guild.name, guild.iconURL);
		boostChannel.send({embed: embed});
	}

}