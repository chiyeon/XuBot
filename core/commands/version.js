const Discord = require('discord.js');

module.exports.Description = "Lists current version and changelog of the bot. If a previous version is specified, the changelog for that version is displayed instead.";
module.exports.Usage = "[Optional Version]";

var versions = {
   0.3: [
      "Revamped **character** command: displays user Level, XP with XP Bar, Class, House, and Stats",
      "Users can now select any class with the **class** command",
      "Users can now select 1 of 3 houses with the **house** command",
      "Users now earn XP through **plus**, **gamble**, and **train**",
      "Users can increase their stats with the **train** command"
   ],
   0.4: [
      "Added Global User Data: User data is now stored and saved across servers",
      "Added Command Aliases: Shortened version of particular commands",
      "Added **report** which can be used to alert the developer of any issues or feedback",
      "Revamped **character** display with better XP bar, default class/house values, and more visuals",
      "Revamped **version** to now allow the optional previous version argument to look at prior builds",
      "Revamped **help** to include command usage, command aliases, and adjusted various help command descriptions",
      "Adjusted **lottery** to include 3 distinct winning categories.",
      "Adjusted **lottery** chances and payouts",
      "Adjusted **scoreboard** to display users across all servers",
      "Adjusted **class** to support multiple word titles",
      "Adjusted **train** to use shorthand notation (int, CHR)",
      "Adjusted **train** to have a small chance at failing training"
   ]
}

module.exports.Run = async (Xu, message, server, args, client) => {
   var targetVersion = Xu.version;
   if(args[0] != null) {
      targetVersion = parseFloat(args[0]);
   }

   if(versions[targetVersion] == null) {
      return Xu.SendEmbed(message.channel, `Input a valid version! (Current Version: ${Xu.version})`, Xu.COLOR_ERROR);
   }

   var changelog = "";
   versions[targetVersion].forEach(element => {
      changelog += `- ${element}\n`;
   });

   Xu.SendEmbedWithTitle(message.channel, `XuBot Version ${targetVersion}`, `**Changelog**\n${changelog}`, Xu.COLOR_INFO)
}
