//slim chance to win a large amount of XuCoins

const Discord = require('discord.js');

module.exports.Description = () => {
	return "Buy a lottery ticket for 5 XuCoins. Random chance at big earnings.";
}

module.exports.Run = async (Xu, message, server, args, client) => {

   if(Xu.users[message.author.id].xucoins < 5) {
      return message.react('🤡');
   } else {
      Xu.users[message.author.id].xucoins -= 5;
   }

   var luckyNumber = Math.random()*10000;

   if(Xu.users[message.author.id].xuser && message.content.toLowerCase().includes('win')) {
      luckyNumber = 6;
   }

   if(luckyNumber < 7) {
      var amount = Math.floor(Math.random()*750000+250000);

      if(Math.random() < 0.1) {
         amount += Math.floor(Math.random() * 250000+250000);
         if(Math.random() < 0.25) {
               amount += Math.floor(Math.random() * 500000+500000);
         }
      }

      Xu.users[message.author.id].xucoins += amount;
      Xu.SaveUserData();

      Xu.SendEmbed(message.channel, `${message.author} has won ${amount} XuCoins in the lottery! Congrats!`, Xu.COLOR_NORMAL);
      message.react('🎉');
   } else {
      message.react('👍');
   }
   
   
}
