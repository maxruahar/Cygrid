module.exports = async (client, oldMember, newMember) => {
	const { inspect } = require("util");

	if (!["185978912126402560"].includes(oldMember.guild.id)) return;

	const guild = oldMember.guild;
	const text = guild.channels.get('592338529053573122');
	const voice = guild.channels.get('592338583315283969');
	let newUserChannel = newMember.voiceChannel ? newMember.voiceChannel : {};
	let oldUserChannel = oldMember.voiceChannel ? oldMember.voiceChannel : {};

	if (oldUserChannel.id == voice.id) {
		text.overwritePermissions(client.users.get(oldMember.user.id), {'VIEW_CHANNEL': false})
	}
	if (newUserChannel.id == voice.id) {
		text.overwritePermissions(client.users.get(newMember.user.id), {'VIEW_CHANNEL': true})
	}
};
