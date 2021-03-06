exports.run = async (client, message, args, level) => {

  //If a user is mentioned, get their user object
  let user = message.mentions.users.first();

  //Allow user to remove their own messages
  if (!user && level < 1) user = message.author;

  //Return if user without permissions tries to remove others' messages
  if (user && message.author.id !== user.id && level < 2) return;

  //Remove invoking message
  await message.delete();

  //Find number of messages to remove by checking if arguments are numbers
  //in case of a user being specified
  const num = !!parseInt(args[0]) ? parseInt(args[0]) : parseInt(args[1]);

  //If no number of messages is specified, return error message to channel
  if (!num) return message.channel.send("Please specify an amount of messages to remove.");

  //Fetch maximum number of messages possible from channel
  //then filter messages of user if specified
  message.channel.fetchMessages({limit: 100})
    .then(messages => {

      //If a user is specified, filter to select only their messages
      if (user) {
        messages = messages.filter(m => m.author.id == user.id).array().slice(0, num);

      //Otherwise select messages up to stated amount
      } else {
        messages = messages.array().slice(0, num);
      }

      //Delete the selected messages
      message.channel.bulkDelete(messages)
        .then(msgs => {

          //Populate the confirmation message based on whether a user was provided or not
          const msg = user ? `Removed **${msgs.size}** messages from ${user.username}.` : `Removed **${msgs.size}** messages.`;

          //Send confirmation message to channel
          message.channel.send(msg)

            //Remove confirmation message after 1 second
            .then(m => m.delete(2000));
        })

        //Log error to console if there is one
        .catch(error => console.log(error.stack));
    });

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["purge", "p"],
  permLevel: "Moderator",
  guilds: [],
  cooldown: 2500
};

exports.help = {
  name: "clear",
  category: "Moderation",
  description: "Remove messages from a channel.",
  usage: "clear [user] <number>"
};
