module.exports = async (client, member) => {
	const settings = client.settings.get(member.guild.id);
	const logChannel = client.channels.get(settings.logChannel);
	if (member.guild.id == "336818736810164235" && Object.keys(client.skillingBans).includes(member.user.id)) {
		member.ban(`${member.user.username} was banned automatically upon joining as they are on the auto-ban list.`);
		logChannel.send(`${member.user.username} was banned automatically upon joining as they are on the auto-ban list.`);
	}
	if (/discord.gg/gi.test(member.user.username)
		|| /discord.me/gi.test(member.user.username)
		|| /add me/gi.test(member.user.username)
		|| /pls add/gi.test(member.user.username)
		|| /add pls/gi.test(member.user.username)
		|| /twitch.tv/gi.test(member.user.username)
		|| /twitter.com/gi.test(member.user.username)
		|| /selling/gi.test(member.user.username)
		|| /.gg/gi.test(member.user.username)) {
		member.ban(`${member.user.username} was banned automatically upon joining as their username seems to be advertising other servers/websites.`);
//		if (member.user.lastMessage.channel.messages.get(member.user.lastMessageID).type == "GUILD_MEMBER_JOIN") {
//		await client.wait(10000);
//			member.user.lastMessage.delete();
//		}
	}
}
