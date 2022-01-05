const Discord = require('discord.js');

module.exports.Description = "An overview of your character.";
module.exports.Usage = "";
module.exports.Category = "Character";

module.exports.Run = async (Xu, message, server, args, client) => {
   var user = Xu.users[message.author.id];
   var stats = user.stats;

   var xp = "XP: ";
   var targetXP = user.xp / Xu.GetTargetXP(user.level) * 10;
   for(var i = 0; i < 10; i++) {
      if(i < targetXP - 1)
         xp += ":blue_square:";
      else
         xp += ":white_large_square:";
   }
   xp += ` (${user.xp}/${Xu.GetTargetXP(user.level)})`

   var color = Xu.COLOR_NORMAL;
   var icon = ":cloud:";
   if(user.house == "wisteria") {
      color = Xu.COLOR_WISTERIA;
      icon = ":white_flower:";
   } else if(user.house == "conqueror") {
      color = Xu.COLOR_CONQUEROR;
      icon = ":flower_playing_cards:";
   } else if(user.house == "arcana") {
      color = Xu.COLOR_ARCANA;
      icon = ":fireworks:";
   }

   message.channel.send(
      new Discord.MessageEmbed()
         .setColor(color)
         .setTitle(`**${message.author.username}**`)
         .setDescription(`*${user.house.charAt(0).toUpperCase() + user.house.slice(1)} House* ${icon}\n\n**Level ${user.level} ${user.class}**\n${xp}\n`)
         .addFields(
            { name: "Attributes", value: `STR:  ${stats.strength}\n INT:  ${stats.intelligence}\nDEX:  ${stats.dexterity}\nCHR:  ${stats.charisma}`, inline: true },
         )
   );
}
