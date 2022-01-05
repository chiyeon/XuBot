const Discord = require('discord.js');

module.exports.Description = "Lists current version and changelog of the bot.";
module.exports.Usage = "";

module.exports.Run = async (Xu, message, server, args, client) => {
   Xu.SendEmbedWithTitle(message.channel, `XuBot Version ${Xu.version}`, `**Changelog**\n- Revamped **character** command: displays user Level, XP with XP Bar, Class, House, and Stats\n- Users can now select any class with the **class** command\n- Users can now select 1 of 3 houses with the **house** command\n- Users now earn XP through **plus**, **gamble**, and **train**\n- Users can increase their stats with the **train** command`, Xu.COLOR_INFO)
}
