// awards a player x amount of XuCoins

const Discord = require('discord.js');

module.exports.Description = () => {
	return "Sets the level of a user";
}

module.exports.Run = async (Xu, message, server, args, client) => {
	if(args.length != 2)
		return Xu.SendEmbed(message.channel, "Use as '*setlevel {target} {level}*'", Xu.COLOR_ERROR);
	
	if(message.mentions.users.first() == null)
		return Xu.SendEmbed(message.channel, "Include a target", Xu.COLOR_ERROR);
	
	var amount = parseInt(args[1]);
	if(isNaN(amount))
		return Xu.SendEmbed(message.channel, "Input a valid number!", Xu.COLOR_ERROR);
	
   var user = Xu.users[message.mentions.users.first().id];

	user.level = amount;
   user.xp = 0;
	Xu.SaveUserData();
	Xu.SendEmbed(message.channel, `Changed ${message.mentions.users.first().username} to Level ${amount}!`, Xu.COLOR_INFO);
}
