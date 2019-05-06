const Discord = require("discord.js");
const client = new Discord.Client();
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
const Enmap = require("enmap");
const EnmapLevel = require("enmap-level");

client.rebootChannel = "";
client.cmdCD = new Set();
client.ignoredUsers = new Set();
client.skillingBans = {
"213996200544829450": "Nelver",
"206709131514609685": "Derek",
"227019040512671744": "Thulthar",
"202758257738121216": "Zemo",
"381047676105523200": "Rusty",
"258019528011808770": "PK",
"172783182272397313": "Wolf",
"200133258879434753": "smd",
"155780988482486272": "lturange",
"273582635262148611": "unknown"
}

client.config = require("./config.js");
require("./modules/functions.js")(client);

client.commands = new Enmap();
client.aliases = new Enmap();
client.settings = new Enmap({provider: new EnmapLevel({name: "settings"})});
client.affiliates = new Enmap({provider: new EnmapLevel({name: "affiliates"})});
client.affLinks = new Enmap({provider: new EnmapLevel({name: "affLinks"})});
client.affMessages = new Enmap({provider: new EnmapLevel({name: "affMessages"})});
client.affTimestamps = new Enmap({provider: new EnmapLevel({name: "affTimestamps"})});

const init = async () => {

	const cmdFiles = await readdir("./commands/");
	console.log(`Loading a total of ${cmdFiles.length} commands.`);
	cmdFiles.forEach(f => {
		if (!f.endsWith(".js")) return;
		const response = client.loadCommand(f);
		if (response) console.log(response);
	});

	const evtFiles = await readdir("./events/");
	console.log(`Loading a total of ${evtFiles.length} events.`);
	evtFiles.forEach(file => {
		const eventName = file.split(".")[0];
		const event = require(`./events/${file}`);
		client.on(eventName, event.bind(null, client));
		delete require.cache[require.resolve(`./events/${file}`)];
	});

	client.levelCache = {};
	for (let i = 0; i < client.config.permLevels.length; i++) {
		const thisLevel = client.config.permLevels[i];
		client.levelCache[thisLevel.name] = thisLevel.level;
	}
	client.login(client.config.token);

};

init();
