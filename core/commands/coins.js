//show how many xucoins the user has

const Discord = require('discord.js');

module.exports.Description = () => {
	return "Your current XuCoins balance.";
}

module.exports.Run = async (Xu, message, server, args, client) => {
   Xu.SendEmbed(message.channel, `You have ${server.users[message.author.id].xucoins} XuCoins.`, Xu.colors[Xu.normal])
}
