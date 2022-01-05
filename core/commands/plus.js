const Discord = require('discord.js');

module.exports.Description = "Find ONE XuCoin and TEN XP.";
module.exports.Category = "XuCoins";
module.exports.Usage = ""

module.exports.Run = async (Xu, message, server, args, client) => {
   var user = Xu.users[message.author.id];

   user.xucoins++;
   Xu.AddXP(user, 1, message.channel);

   message.react('😳');
   
   Xu.SaveUserData();
}
