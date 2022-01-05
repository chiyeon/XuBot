const Discord = require('discord.js');

module.exports.Description = "Change your house to [Wisteria, Arcana, Conqueror]";
module.exports.Category = "Character";
module.exports.Usage = "[TargetHouse]"

module.exports.Run = async (Xu, message, server, args, client) => {

   if(args[0] == null)
      return Xu.SendEmbed(message.channel, "Requires a house argument! [Wisteria, Arcana, Conqueror]", Xu.COLOR_ERROR);
   
   var targetHouse = args[0].toLowerCase();

   if(targetHouse == "wisteria" || targetHouse == "arcana" || targetHouse == "conqueror") {
      Xu.users[message.author.id].house = targetHouse;
      Xu.SaveUserData();

      return Xu.SendEmbed(message.channel, `You have joined the ${targetHouse} house!`, Xu.COLOR_INFO);
   }

   return Xu.SendEmbed(message.channel, `Requires a valid house! (Wisteria, Arcana, Conqueror)`, Xu.COLOR_ERROR);
}
