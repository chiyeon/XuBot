// awards a player x amount of XuCoins

const Discord = require('discord.js');

module.exports.Description = () => {
	return "Awards a user XuCoins at no cost.";
}

module.exports.Run = async (Xu, message, server, args, client) => {
	if(args.length != 2)
		return Xu.SendEmbed(message.channel, "Use as '*award {target} {amount}*'", Xu.colors[Xu.error]);
	
	if(message.mentions.users.first() == null)
		return Xu.SendEmbed(message.channel, "Include a target", Xu.colors[Xu.error]);
	
	var amount = parseInt(args[1]);
	if(isNaN(amount))
		return Xu.SendEmbed(message.channel, "Input a valid number!", Xu.colors[Xu.error]);
	
	Xu.users[message.mentions.users.first().id].xucoins += amount;
	Xu.SaveUserData();
	Xu.SendEmbed(message.channel, `Awarded ${message.mentions.users.first().username} ${amount} XuCoins!`);
}
