//displays a list of all avaliable commands for the bot to run. If an argument is another command, then display how to use the command

const Discord = require('discord.js');

module.exports.Description = () => {
	return "A list of all commands. Use 'help [command]' to find out more about a particular command!";
}

module.exports.Run = async (Xu, message, server, args, client) => {
	
	if(args.length == 0) {
		const helpEmbed = new Discord.MessageEmbed()
		.setColor(Xu.COLOR_NORMAL)
		.setTitle("**XuBot Help Menu**")
		.setDescription("Use \'" + Xu.prefix + "\' in front of every command!")
		.addFields(
			{ name: 'Bot Commands', value: 'about\nhelp\nversion' },
			{ name: 'XuCoins', value: 'coins\nplus\ngamble\nlottery\nscoreboard' },
			{ name: 'Character', value: 'character\nclass\nhouse\ntrain'}
		)
		
		message.channel.send(helpEmbed);
	} else {
		//check if the user is attempting to get help on a particular command
		try {
			var command = args[0].toLowerCase();
			var commandDescription = require("./" + args[0].toLowerCase() + ".js").Description();
			Xu.SendEmbedWithTitle(message.channel, Xu.prefix + command, commandDescription, Xu.COLOR_NORMAL);
		} catch {
			Xu.SendEmbed(message.channel, "Sorry, I don't understand that command!", Xu.COLOR_NORMAL);
		}
	}
}
