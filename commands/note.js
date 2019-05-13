exports.run = async (client, message, [first, ...args], level) => {

  const guild = message.guild;
  const {id, name} = guild;
  if (!client.notes.has(id)) client.notes.set(id, {});
  const settings = client.settings.get(id);
  const {prefix} = settings;
  const notes = client.notes.get(id);
  const notesList = Object.getOwnPropertyNames(notes);
  first = first ? first.toLowerCase() : undefined;
  const mcs = (msg) => message.channel.send(msg);
  const notify = (title, content) => {
    return `\`\`\`fix\n${title}\`\`\`\`\`\`css\n${content}\`\`\``;
  }

  message.delete();

  if (["n", "c", "new", "create"].includes(first)) {
    if (!args[0]) return mcs(`Please provide a valid title for the note that you are creating.`);
    const [title, content] = args.join(" ").split("//");
    if (!content) return mcs(`Please provide valid content for the note that you are creating. Title and content should be separated by a double forward-slash \`//\`.`);
    notes[message.id] = {"title": title.trim(), "content": content.trim()};
    client.notes.set(id, notes);
    return mcs(`​${notify(title.trim(), content.trim())}\nNote **${Object.getOwnPropertyNames(client.notes.get(id)).findIndex(f => f == message.id)+1}** created.`);

  } else

  if (["d", "r", "del", "delete", "remove"].includes(first)) {
    if (!args[0]) return mcs(`Please provide a valid ID for the note that you wish to delete.`);
    const noteID = args[0];
    if (isNaN(noteID) || noteID < 1) return mcs(`Please provide a valid ID for the note that you wish to delete.`);
    if (notesList.length < noteID) return mcs(`There is no note **${noteID}** for **${name}**.`);
    const adjusted = Number(noteID) - 1;
    delete notes[notesList[adjusted]];
    client.notes.set(id, notes);
    return mcs(`Note **${noteID}** deleted.`);

  } else

  if (["e", "edit"].includes(first)) {
    if (!args[0]) return mcs(`Please provide a valid ID for the note that you wish to edit.`);
    const noteID = args[0];
    if (isNaN(noteID) || noteID < 1) return mcs(`Please provide a valid ID for the note that you wish to edit.`);
    if (notesList.length < noteID) return mcs(`There is no note **${noteID}** for **${name}**.`);
    const adjusted = Number(noteID) - 1;
    if (!args[1]) return mcs(`Please provide a valid field type to edit.`);
    const field = args[1];
    if (!["title", "content"].includes(field.toLowerCase())) return mcs(`Please provide a valid field type to edit.`);
    const content = args.splice(2).join(" ");
    if (!content) return mcs(`Please provide valid content to replace the **${field}** of **${noteID}** with.`);
    const note = notes[notesList[adjusted]];
    note[field] = content;
    client.notes.set(id, notes);
    return mcs(`​${notify(note.title, note.content)}\nNote **${noteID}** updated.`);

  } else

  if (["a", "add", "addline"].includes(first)) {
    if (!args[0]) return mcs(`Please provide a valid ID for the note that you wish to edit.`);
    const noteID = args[0];
    if (isNaN(noteID) || noteID < 1) return mcs(`Please provide a valid ID for the note that you wish to edit.`);
    if (notesList.length < noteID) return mcs(`There is no note **${noteID}** for **${name}**.`);
    const adjusted = Number(noteID) - 1;
    const content = args.splice(1).join(" ");
    if (!content) return mcs(`Please provide valid content to add to note **${noteID}**.`);
    const note = notes[notesList[adjusted]];
    note.content += `\n${content}`;
    client.notes.set(id, notes);
    return mcs(`​${notify(note.title, note.content)}\nNote **${noteID}** updated.`);

  } else

  if (!isNaN(first)) {
    if (notesList.length < first) return mcs(`There is no note **${first}** for **${name}**.`);
    if (first < 1) return mcs(`Please provide a valid ID for the note that you wish to display.`);
    const adjusted = Number(first) - 1;
    const note = notes[notesList[adjusted]];
    return mcs(`​${notify(note.title, note.content)}`);

  } else

  if (!first) {
    if (notesList.length < 1) return mcs(`There are currently no notes stored for **${name}**. Use **${prefix}notes create <title> // <content>** to store a new note.`);
    const final = notesList.map(n => {
      const note = notes[n]; 
      const title = note.title.length > 40 ? `${note.title.slice(0,40)}...` : note.title;
      return `​${Number(notesList.findIndex(f => f == n))+1}: ${title}`;
    });
  return mcs(`​${notify(`${name} notes`, final.join("\n"))}`);
    
  }

  else {
    return;
  }

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["note"],
  permLevel: "Bot Admin",
  guilds: [],
  cooldown: 2500
};

exports.help = {
  name: "notes",
  category: "Utility",
  description: "Record per-server notes.",
  usage: "notes [ID]\n       notes <create> <title> // <content>\n       notes <delete> <ID>\n       notes <edit> <ID> <title/content> <newContent>\n       notes <add> <ID> <additionalContent>"
};
