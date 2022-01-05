const Discord = require('discord.js');

module.exports.Description = "Train a particular attribute [str, int, dex, chr] and gain XP.";
module.exports.Usage = "[Target Attribute]";

module.exports.Run = async (Xu, message, server, args, client) => {
   var user = Xu.users[message.author.id];

   if(args[0] == null)
      return Xu.SendEmbed(message.channel, "Requires 1 argument: training target!", Xu.COLOR_ERROR)

   var targetAttr = args[0].toLowerCase();

   // check if arg valid
   if(targetAttr == "str" || targetAttr == "int" || targetAttr == "chr" || targetAttr == "dex") {
      // i cant replace everyone so i have to do this gg
      var dataAttr;
      switch(targetAttr) {
         case "str":
            dataAttr = "strength"
            break;
         case "int":
            dataAttr = "intelligence"
            break;
         case "dex":
            dataAttr = "dexterity"
            break;
         case "chr":
            dataAttr = "charisma"
            break;
      }

      // random chance to fail
      if(Math.random() > 0.1) {
         user.stats[dataAttr]++;
         Xu.AddXP(user, 10, message.channel);

         Xu.SaveUserData();
         return Xu.SendEmbed(message.channel, `${targetAttr.toUpperCase()} +1!\nXP +10!`, Xu.COLOR_INFO);
      } else {
         user.stats[dataAttr]--;
         if(user.stats[dataAttr] < 0) user.stats[dataAttr] = 0;
         Xu.AddXP(user, -10, message.channel)
         
         Xu.SaveUserData();
         return Xu.SendEmbed(message.channel, `An accident happens!\n\n${targetAttr.toUpperCase()} -1!\nXP -10!`, Xu.COLOR_ERROR);
      }
   } else {
      return Xu.SendEmbed(message.channel, "Enter valid training target! (STR, int, etc)", Xu.COLOR_ERROR)
   }
}
