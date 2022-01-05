const Discord = require('discord.js');

module.exports.Description = "Makes XuBot say anything, and deletes the command.";
module.exports.Usage = "[Target Words]"

module.exports.Run = async (Xu, message, server, args, client) => {
	message.channel.send(args.join(' '));
	message.delete();
	return;
}
