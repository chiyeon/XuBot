//increment all about alvins

const Discord = require('discord.js');

module.exports.Description = () => {
	return "An overview of your character.";
}

module.exports.Category = "Character";

module.exports.Run = async (Xu, message, server, args, client) => {
   var user = Xu.users[message.author.id];
   var stats = user.stats;

   var xp = "XP: ";
   var targetXP = user.xp / (user.level * user.level) * 10;
   for(var i = 0; i < 10; i++) {
      if(i < targetXP - 1)
         xp += "#";
      else
         xp += "=";
   }
   xp += ` (${user.xp}/${user.level * user.level})`

   return Xu.SendEmbedWithTitle(message.channel, `${message.author.username}`, `*${user.house.charAt(0).toUpperCase() + user.house.slice(1)} House*\n\n**Level ${user.level} ${user.class}**\n${xp}\n\nStrength: ${stats.strength}\nIntelligence: ${stats.intelligence}\nDexterity: ${stats.dexterity}\nCharisma: ${stats.charisma}\n`, Xu.colors[Xu.info]);
}
