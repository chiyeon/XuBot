const Discord = require('discord.js');

module.exports.Description = "Buy a lottery ticket for 5 XuCoins. Random chance at big earnings.";
module.exports.Usage = ""

module.exports.Run = async (Xu, message, server, args, client) => {

   if(Xu.users[message.author.id].xucoins < 5) {
      return message.react('🤡');
   } else {
      Xu.users[message.author.id].xucoins -= 5;
   }

   var luckyNumber = Math.random()*1000;
   var winType = "Normal";

   if(Xu.users[message.author.id].xuser && message.content.toLowerCase().includes('win')) {
      luckyNumber = 6;
   }

   if(luckyNumber < 7) {
      var amount = Math.floor(Math.random()*10000+1000);

      if(Math.random() < 0.25) {
         winType = "Great";
         amount += Math.floor(Math.random() * 5000+5000);
         if(Math.random() < 0.5) {
            winType = "Extravagant";
            amount += Math.floor(Math.random() * 10000+5000);
         }
      }

      Xu.users[message.author.id].xucoins += amount;
      Xu.SaveUserData();

      Xu.SendEmbed(message.channel, `${message.author} has won a **${winType}** amount of **${amount}** XuCoins in the lottery! Congrats!`, Xu.COLOR_NORMAL);
      message.react('🎉');
   } else {
      message.react('👍');
   }
   
   
}
