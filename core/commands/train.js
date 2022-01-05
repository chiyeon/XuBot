// train a particular attribute/stat

const Discord = require('discord.js');

module.exports.Description = () => {
	return "Train a particular attribute [strength, intelligence, dexterity, charisma] and gain XP.";
}

module.exports.Run = async (Xu, message, server, args, client) => {
   var user = Xu.users[message.author.id];

   if(args[0] == null)
      return Xu.SendEmbed(message.channel, "Requires 1 argument: training target!", Xu.COLOR_ERROR)

   var targetAttr = args[0].toLowerCase();

   // check if arg valid
   if(targetAttr == "strength" || targetAttr == "intelligence" || targetAttr == "charisma" || targetAttr == "dexterity") {
      user.stats[targetAttr]++;
      Xu.AddXP(user, 10, message.channel);

      Xu.SaveUserData();
      return Xu.SendEmbed(message.channel, `${targetAttr} +1!\nXP +10!`, Xu.COLOR_INFO);
   } else {
      return Xu.SendEmbed(message.channel, "Enter valid training target! (Strength, Intelligence, etc)", Xu.COLOR_ERROR)
   }
}
