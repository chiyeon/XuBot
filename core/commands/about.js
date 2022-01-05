const Discord = require('discord.js');

module.exports.Description = "Find out about people !";
module.exports.Usage = "[@TargetUser]"
module.exports.Category = "Main";

module.exports.Run = async (Xu, message, server, args, client) => {
   if(args.length < 1) 
      return Xu.SendEmbed(message.channel, "owen is sho cute", Xu.COLOR_ERROR);

   var msg = await GetDescription(args[0].toLowerCase());
   await Xu.SendEmbed(message.channel, msg, Xu.COLOR_NORMAL);
}

function GetDescription(name) {
   switch(name) {
      default:
         return "Who now?";
      case 'alvins':
         return "Hi! I'm Alvins Xu! I was born in 2007, and I'm Rank 10 Challenger this season. My pocket pick is Alistar, and I'm Rank One NA for the most mastery points on this champion.";
      break;
      case 'maple':
         return "My name is Maple Lin. I'm an underground soundcloud rapper by the name of Yung Jun. Check me out, links in the description. I drop fire mixtapes every day."
      break;
      case 'marco':
         return "My name is Marco Esteban. I was born in 2007, and I'm rank 2 challenger this season. My pocket pick is Volibear, and when he's banned I play Pyke."
      break;
      case 'benjamin':
         return "My name is Marco Esteban."
      break;
      case 'justin':
         return "My name is Justin Andre Garcia-Mendoza, and I'm Iron I in Valorant. But I deserve Radiant."
      break;
      case 'raymond':
         return "I am a good person."
      break;
      case 'matt':
         return "I like men."
      break;
      case 'owen':
         return "my name is owen and I'm a known racist and homophobe."
      break;
      case 'brandon':
         return "im the cutest boy ever"
      break;
   }
}
