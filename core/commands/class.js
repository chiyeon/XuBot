const Discord = require('discord.js');

module.exports.Description = "Change your character class to anything you want.";
module.exports.Category = "Character";
module.exports.Usage = "[Target Class]"

module.exports.Run = async (Xu, message, server, args, client) => {

   if(args[0] == null)
      return Xu.SendEmbed(message.channel, "Requires a class argument!", Xu.COLOR_ERROR);

   Xu.users[message.author.id].class = args[0];
   Xu.SaveUserData();

   return Xu.SendEmbed(message.channel, `You have become a ${args[0]}`, Xu.COLOR_NORMAL);
}
