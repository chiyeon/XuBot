const Discord = require('discord.js');

module.exports.Description = "An overview of your character.";
module.exports.Category = "Character";
module.exports.Usage = "";

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
            { name: "Attributes", value: `STR:  ${stats.str}\n INT:  ${stats.int}\nDEX:  ${stats.dex}\nCHR:  ${stats.chr}\nSP:  ${user.skillPoints}`, inline: true },
            { name: "Combat Stats", value: `Max Health: ${10 + user.level * 2 + user.bonusHealth} (${10 + user.level * 2} base + ${user.bonusHealth} bonus)\nActive Ability: ${user.activeAbility}\nPassive Ability: ${user.passiveAbility}\nWins: ${user.wins} | Losses: ${user.losses}`, inline: true }
         )
   );
}
