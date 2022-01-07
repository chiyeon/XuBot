const Discord = require('discord.js');

module.exports.Description = "Search for the information on a particular ability";
module.exports.Category = "Combat";
module.exports.Usage = "[Target Ability]"

module.exports.Run = async (Xu, message, server, args, client) => {

   if(args[0] == null)
      return Xu.SendEmbed(message.channel, "Requires a target ability!", Xu.COLOR_ERROR);
   
   if(args[0].toLowerCase() == "list") {
      var abilities = "";

      Object.keys(require("../combat/AbilitiesDatabase.js").activeAbilities).forEach(key => {
         abilities += key + ", ";
      })

      return Xu.SendEmbedWithTitle(message.channel, `Abilities List`, abilities, Xu.COLOR_INFO);
   }
   
   var targetAbility = args.join(" ").toLowerCase();

   var activeAbilities = require("../combat/AbilitiesDatabase.js").activeAbilities;
   var passiveAbilities = require("../combat/AbilitiesDatabase.js").passiveAbilities;

   var ability = null;

   Object.keys(activeAbilities).forEach(key => {
      if(key.toLowerCase() == targetAbility) {
         ability = activeAbilities[key];
         ability.name = key;
      }
   })

   if(ability) {
      return message.channel.send(new Discord.MessageEmbed()
         .setColor(Xu.COLOR_INFO)
         .setTitle(ability.name)
         .setDescription(`*${ability.tier} Tier Active*`)
         .addFields(
            { name: "Description", value: ability.description, inline: true },
            { name: "Damage", value: `Base Damage: ${ability.baseDamage}\nINT Multiplier: ${ability.intMultiplier}\nSTR Multiplier: ${ability.strMultiplier}\n\nFinal Damage: ${ability.baseDamage} + (${ability.intMultiplier} * INT) + (${ability.strMultiplier} * STR) + LEVEL`, inline: true },
            
         )
      )
   }

   // otherwise search for passive abilityes

   Object.keys(passiveAbilities).forEach(key => {
      if(key.toLowerCase() == targetAbility) {
         ability = passiveAbilities[key];
         ability.name = key;
      }
   })

   if(ability) {
      return message.channel.send(new Discord.MessageEmbed()
         .setColor(Xu.COLOR_INFO)
         .setTitle(ability.name)
         .setDescription(`*${ability.tier} Tier Passive*`)
         .addFields(
            { name: "Description", value: ability.description, inline: true }
            
         )
      )
   }

   // finally if no dice then

   return Xu.SendEmbed(message.channel, "Could not find that ability!", Xu.COLOR_ERROR);
}
