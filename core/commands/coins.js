const Discord = require('discord.js');

module.exports.Description = "Your current XuCoins balance.";
module.exports.Usage = ""

module.exports.Run = async (Xu, message, server, args, client) => {
   Xu.SendEmbed(message.channel, `You have ${Xu.users[message.author.id].xucoins} XuCoins.`, Xu.COLOR_NORMAL)
}
