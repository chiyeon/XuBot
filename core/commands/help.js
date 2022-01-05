const Discord = require('discord.js');
const fs = require("fs");

module.exports.Description = "A list of all commands. Use 'help [command]' to find out more about a particular command!";
module.exports.Category = "Main";
module.exports.Usage = "[optional target command]"

module.exports.Run = async (Xu, message, server, args, client) => {
	if(args.length == 0) {
		var categories = {};

		// read through all the commands & categorize them based on the Category var
		fs.readdir("./core/commands/", function(err, files) {
			if(err) console.log(err);

			files.forEach(function(file, index) {
				var category = require(`./${file}`).Category
				if(categories[category] == null) {
					categories[category] = [];
				}
				categories[category].push(file.toString().slice(0, -3));
			})

			const helpEmbed = new Discord.MessageEmbed()
			.setColor(Xu.COLOR_NORMAL)
			.setTitle("**XuBot Help Menu**")
			.setDescription("Use \'" + Xu.prefix + "\' in front of every command!")

			Object.keys(categories).forEach(key => {
				var value = "";
				categories[key].forEach(category => {
					value += category + "\n";
				})
				helpEmbed.addField(key, value, true)
			})
			
			message.channel.send(helpEmbed);
		})
	} else {
		//check if the user is attempting to get help on a particular command
		try {
			var command = args[0].toLowerCase();
			var commandSrc = require("./" + args[0].toLowerCase() + ".js");
			var commandDescription = commandSrc.Description;

			var commandUsage = "`" + Xu.prefix + command + " " + commandSrc.Usage + "`";

			var aliases = "";
			var list = require("../aliases.js").list;
			Object.keys(list).forEach(key => {
				if(list[key] == command) {
					aliases += "`" + key + "`, "
				}
			});
			aliases = aliases.slice(0, -2);

			message.channel.send(
				new Discord.MessageEmbed()
					.setColor(Xu.COLOR_NORMAL)
					.setTitle("`" + Xu.prefix + command + "`")
					.setDescription(commandDescription)
					.addFields(
						{ name: "usage", value: commandUsage },
						{ name: "aliases", value: `Alternatives:\n${aliases == "" ? "none" : aliases}`}
					)
			);
		} catch {
			Xu.SendEmbed(message.channel, "Sorry, I don't understand that command!", Xu.COLOR_NORMAL);
		}
	}
}
