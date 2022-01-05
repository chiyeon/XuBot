// tells the bot to say something

const Discord = require('discord.js');

module.exports.Description = () => {
	return "Makes XuBot say anything, and deletes the command.";
}

module.exports.Run = async (Xu, message, server, args, client) => {
	message.channel.send(args.join(' '));
	message.delete();
	return;
}
