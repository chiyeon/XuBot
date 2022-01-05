//increment xucoins by one

const Discord = require('discord.js');

module.exports.Description = () => {
	return "Find ONE XuCoin and ONE XP.";
}

module.exports.Run = async (Xu, message, server, args, client) => {
   Xu.users[message.author.id].xucoins++;
   Xu.AddXP(Xu.users[message.author.id], 1, message.channel);

   message.react('😳');
   
   Xu.SaveUserData();
}
