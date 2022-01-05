// change house

const Discord = require('discord.js');

module.exports.Description = () => {
	return "Change your house to [Wisteria, Arcana, Conqueror]";
}

module.exports.Run = async (Xu, message, server, args, client) => {

   if(args[0] == null)
      return Xu.SendEmbed(message.channel, "Requires a class argument!", Xu.colors[Xu.error]);
   
   var targetHouse = args[0].toLowerCase();

   if(targetHouse == "wisteria" || targetHouse == "arcana" || targetHouse == "conqueror") {
      Xu.users[message.author.id].house = targetHouse;
      Xu.SaveUserData();

      return Xu.SendEmbed(message.channel, `You have joined the ${targetHouse} house!`, Xu.colors[Xu.info]);
   }

   return Xu.SendEmbed(message.channel, `Requires a valid house! (Wisteria, Arcana, Conqueror)`, Xu.colors[Xu.error]);
}
