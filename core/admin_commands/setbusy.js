const Discord = require('discord.js');

module.exports.Description = "Change the 'busy' status of a user";
module.exports.Usage = "[@TargetUser] [Is Busy]"

module.exports.Run = async (Xu, message, server, args, client) => {
	if(args.length != 2)
		return Xu.SendEmbed(message.channel, "Use as '*setbusy {target} {is Busy}*'", Xu.COLOR_ERROR);
	
	if(message.mentions.users.first() == null)
		return Xu.SendEmbed(message.channel, "Include a target", Xu.COLOR_ERROR);
	
	var isBusy = args[1].toLowerCase();
	if(isBusy == "true" || isBusy == "false") {
      var targetUser = Xu.users[message.mentions.users.first().id];
      
      if(isBusy == "true") targetUser.busy = true;
      if(isBusy == "false") targetUser.busy = false;
   
      Xu.SaveUserData();
      return Xu.SendEmbed(message.channel, `${message.mentions.users.first().username} busy status set to ${isBusy}`, Xu.COLOR_INFO);
   }
   
   return Xu.SendEmbed(message.channel, "Input a valid number!", Xu.COLOR_ERROR);
}
