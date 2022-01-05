// regenerates the user data of a user

const Discord = require('discord.js');

module.exports.Description = () => {
	return "regenerates the user data of a user";
}

module.exports.Run = async (Xu, message, server, args, client) => {
	if(message.mentions.users.first() == null)
		return Xu.SendEmbed(message.channel, "Include a target", Xu.colors[Xu.error]);
	
	var isXuser = Xu.users[message.mentions.users.first().id].xuser;
	
	Xu.users[message.mentions.users.first().id] = Xu.CreateUser();
	Xu.users[message.mentions.users.first().id].xuser = isXuser;
	
	Xu.SaveUserData();
}
