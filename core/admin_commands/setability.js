const Discord = require('discord.js');

module.exports.Description = "Set the ability of a user (Case Sensitive! Please reference the ability database)";
module.exports.Usage = "[@TargetUser] [Ability]"

module.exports.Run = async (Xu, message, server, args, client) => {
	if(args.length < 2)
		return Xu.SendEmbed(message.channel, "Use as '*setability {target} {ability}*'", Xu.COLOR_ERROR);
	
	if(message.mentions.users.first() == null)
		return Xu.SendEmbed(message.channel, "Include a target", Xu.COLOR_ERROR);
	
   args.shift();
	var ability = args.join(" ");
   var targetUser = Xu.users[message.mentions.users.first().id];

   if(require("../combat/AbilitiesDatabase.js").activeAbilities[ability] == null)
      return Xu.SendEmbed(message.channel, `The ability "${ability}" was not found in the database!`, Xu.COLOR_ERROR);

   targetUser.activeAbility = ability;

	Xu.SaveUserData();
   
   return Xu.SendEmbed(message.channel, `${message.mentions.users.first().username}'s ability set to ${ability}`, Xu.COLOR_INFO);
}
