const Discord = require('discord.js');

module.exports.Description = "regenerates the user data of a user";
module.exports.Usage = "[@TargetUser]"

module.exports.Run = async (Xu, message, server, args, client) => {
	if(message.mentions.users.first() == null)
		return Xu.SendEmbed(message.channel, "Include a target", Xu.COLOR_ERROR);

	var isXuser = false;
	if(Xu.users[message.mentions.users.first().id])
		isXuser = Xu.users[message.mentions.users.first().id].xuser;
	
	Xu.users[message.mentions.users.first().id] = Xu.CreateUser(message.mentions.users.first().username);
	Xu.users[message.mentions.users.first().id].xuser = isXuser;
	
	Xu.SaveUserData();
}
