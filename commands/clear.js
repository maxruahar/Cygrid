exports.run = async (client, message, args, level) => {

  //If a user is mentioned, get their user object
  const user = message.mentions.users.first();

  //Find number of messages to remove by checking if arguments are numbers
  //in case of a user being specified, plus one to include invoking message
  const num = !!parseInt(args[0]) ? parseInt(args[0]) + 1 : parseInt(args[1]) + 1;

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
          const msg = user ? `Removed **${msgs.size - 1}** messages from ${user.username}.` : `Removed **${msgs.size - 1}** messages.`;

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
  aliases: ["purge"],
  permLevel: "Administrator",
  guilds: [],
  cooldown: 2500
};

exports.help = {
  name: "clear",
  category: "Moderation",
  description: "Remove messages from a channel.",
  usage: "clear [user] <number>"
};
