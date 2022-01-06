const Discord = require('discord.js');

module.exports.Description = "Challenge another user to a duel";
module.exports.Usage = "[@TargetUser]"

module.exports.Run = async (Xu, message, server, args, client) => {
	if(message.mentions.users.first() == null)
		return Xu.SendEmbed(message.channel, "Include a Target Opponent!", Xu.COLOR_ERROR);
	
   var targetDiscordUser = message.mentions.users.first();
   var user = Xu.users[message.author.id];
   var targetUser = Xu.users[targetDiscordUser.id];

   if(targetUser == null)
      return Xu.SendEmbed(message.channel, "Invalid target user! Try having them send a message in chat first?", Xu.COLOR_ERROR);

   // if either player is busy, cancel
   if(targetUser.busy)
      return Xu.SendEmbed(message.channel, `${targetDiscordUser} is currently busy and cannot duel!`, Xu.COLOR_ERROR);
   if(user.busy)
      return Xu.SendEmbed(message.channel, `You are currently busy and cannot duel!`, Xu.COLOR_ERROR);
   
   // set both to busy
   user.busy = true;
   targetUser.busy = true;
   Xu.SaveUserData();

   server.pendingDuels.push({
      challenger: {
         id:  message.author.id,
         accepted: false
      },
      challenged: {
         id: targetDiscordUser.id,
         accepted: false
      },
   })
   server.duellingUsers.push(message.author.id);      // optimization purposes: search for only these users!
   server.duellingUsers.push(targetDiscordUser.id);

   Xu.SaveServerData(server, message.guild.id);

	Xu.SendEmbed(message.channel, `**${message.author} has challenged ${targetDiscordUser} to a duel!**\n\nBoth players must type "fight" in the next minute to begin!\n\nThe invitation can be declined by either player typing "decline" before accepting`, Xu.COLOR_INFO);
}
