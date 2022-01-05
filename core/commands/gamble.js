const Discord = require('discord.js');

module.exports.Description = "Gamble a certain amount of XuCoins. 50/50 chance to either double amount, or lose it.\n\nUsage: 'gamble [amount]'";
module.exports.Category = "XuCoins";
module.exports.Usage = "[Amount of XuCoins to Wager]"

module.exports.Run = async (Xu, message, server, args, client) => {

   //attempt to convert to int
   var amount = parseInt(args[0]);
   var result = 0;

   //do normal checks (is it a number, do they have enough coins, are they gambling a valid amount)
   if(isNaN(amount)) {
      return Xu.SendEmbed(message.channel, "Gamble a number!", Xu.COLOR_ERROR);
   } else if(amount > Xu.users[message.author.id].xucoins) {
      return Xu.SendEmbed(message.channel, "You don't have enough XuCoins!", Xu.COLOR_ERROR);
   } else if(amount <= 0) {
      return Xu.SendEmbed(message.channel, "Gamble at least one XuCoin!", Xu.COLOR_ERROR);
   }

   result = Math.random() >= 0.5 ? -amount : amount;

   Xu.users[message.author.id].xucoins += result;
   // get xp if win!
   if(result > 0)
      Xu.AddXP(Xu.users[message.author.id], result, message.channel);
   Xu.SendEmbed(message.channel, `<@${message.author.id}> ${result > 0 ? 'won' : 'lost'} the gamble! ${result > 0 ? "Awarded Equal Amount of XP!" : ""}`, result > 0 ? Xu.COLOR_NORMAL : Xu.COLOR_ERROR);
   Xu.SaveUserData();
}
