const Discord = require('discord.js');

module.exports.Description = "Increase a particular attribute [str, int, dex, chr] or bonus HP [hp] at the cost of 1 SP (Skill Point).";
module.exports.Category = "Character";
module.exports.Usage = "[Target Attribute]";

module.exports.Run = async (Xu, message, server, args, client) => {
   var user = Xu.users[message.author.id];

   if(args[0] == null)
      return Xu.SendEmbed(message.channel, "Requires 1 argument: training target!", Xu.COLOR_ERROR)

   if(user.skillPoints <= 0)
      return Xu.SendEmbed(message.channel, "You don't have enough SP (Skill Points) (Requires at least 1)", Xu.COLOR_ERROR);

   var targetAttr = args[0].toLowerCase();

   // check if arg valid
   if(targetAttr == "str" || targetAttr == "int" || targetAttr == "chr" || targetAttr == "dex") {
      user.stats[targetAttr]++;
      user.skillPoints--;

      Xu.SaveUserData();
      return Xu.SendEmbed(message.channel, `SP -1\n${targetAttr.toUpperCase()} +1!`, Xu.COLOR_INFO);
   } else if(targetAttr == "hp") {
      user.bonusHealth += 2;
      user.skillPoints--;

      Xu.SaveUserData();
      return Xu.SendEmbed(message.channel, `SP -1\nBonus HP +2!`, Xu.COLOR_INFO);
   } else {
      return Xu.SendEmbed(message.channel, "Enter valid training target! (HP, int, etc)", Xu.COLOR_ERROR)
   }
}
