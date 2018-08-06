module.exports = (client, member) => {
	const settings = client.settings.get(member.guild.id);
	const logChannel = client.channels.get(settings.logChannel);
	if (member.guild.id == "336818736810164235" && Object.keys(client.skillingBans).includes(member.user.id)) {
		member.ban(`${member.user.username} was banned automatically upon joining as they are on the auto-ban list.`);
		logChannel.send(`${member.user.username} was banned automatically upon joining as they are on the auto-ban list.`);
	}
	if (RegExp('discord.gg').test(member.user.username)
		|| RegExp('add me').test(member.user.username)
		|| RegExp('pls add').test(member.user.username)) {
		member.ban(`${member.user.username} was banned automatically upon joining as their username seems to be advertising other servers.`);
	}
}
