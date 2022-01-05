// train a particular attribute/stat

const Discord = require('discord.js');

module.exports.Description = () => {
	return "Train a particular attribute [strength, intelligence, dexterity, charisma] and gain XP.";
}

module.exports.Run = async (Xu, message, server, args, client) => {
   var user = Xu.users[message.author.id];

   if(args[0] == null)
      return Xu.SendEmbed(message.channel, "Requires 1 argument: training target!", Xu.colors[Xu.error])

   var targetAttr = args[0].toLowerCase();

   // check if arg valid
   if(targetAttr == "strength" || targetAttr == "intelligence" || targetAttr == "charisma" || targetAttr == "dexterity") {
      user.stats[targetAttr]++;
      Xu.AddXP(user, 10, message.channel);

      Xu.SaveUserData();
      return Xu.SendEmbed(message.channel, `${targetAttr} +1!\nXP +10!`, Xu.colors[Xu.info]);
   } else {
      return Xu.SendEmbed(message.channel, "Enter valid training target! (Strength, Intelligence, etc)", Xu.colors[Xu.error])
   }
}
