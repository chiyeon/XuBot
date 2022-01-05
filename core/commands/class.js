const Discord = require('discord.js');

module.exports.Description = "Change your character class to anything you want.";
module.exports.Category = "Character";
module.exports.Usage = "[Target Class]"

module.exports.Run = async (Xu, message, server, args, client) => {

   if(args[0] == null)
      return Xu.SendEmbed(message.channel, "Requires a class argument!", Xu.COLOR_ERROR);
   
   var c = args.join(' ');

   Xu.users[message.author.id].class = c;
   Xu.SaveUserData();

   return Xu.SendEmbed(message.channel, `You have become a ${c}`, Xu.COLOR_NORMAL);
}
