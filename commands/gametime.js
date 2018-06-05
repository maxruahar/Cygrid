exports.run = (client, message, args, level) => {

	//Define new date object with current time
	const d = new Date();

	//Function for formatting times
	function timeStamp(now) {

		//Create an array with the current month, day and time
		const date = [now.getMonth() + 1, now.getDate(), now.getFullYear()];

		//Create an array with the current hour and minute
		let time = [now.getHours(), now.getMinutes()];

		//Define hour seperately as one above is overwritten later in function
		let hour = now.getHours();

		//Determine AM or PM suffix based on the hour
		const suffix = (time[0] < 12) ? "AM" : "PM";

		//Convert hour from military time
		time[0] = (time[0] < 12) ? time[0] : time[0] - 12;

		//If hour is 0, set it to 12
		time[0] = time[0] || 12;

		//If hours or minutes are less than 10, add a zero
		if (time[1] < 10) time[1] = `0${time[1]}`;
		if (hour < 10) hour = `0${hour}`;

		//Return the formatted string
		return `${hour}:${time[1]} **or** ${time.join(":")} ${suffix}`;
	}
	if (!args[0]) {
		//Send current in-game time to channel if no arguments are provided
		return message.channel.send(`Runescape game time is currently: **${timeStamp(d)}**`);
	} else if (!isNaN(args[0])) {
		//Send in-game time after specified number of hours
		d.setHours(d.getHours() + Number(args[0]));
		return message.channel.send(`Runescape game time will be **${timeStamp(d)}** in **${args[0]}** hours`);
	}

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["rgt"],
  permLevel: "User",
  guilds: [],
  cooldown: 2500
};

exports.help = {
  name: "gametime",
  category: "Info",
  description: "Check the current Runescape game time or what it will be in [x] hours.",
  usage: "gametime [hours from now]"
};
