const Discord = require('discord.js');
const fs = require('fs');

module.exports.Description = "Report the description of a bug or anything to the developer";
module.exports.Category = "Main";
module.exports.Usage = "[Description]";

module.exports.Run = async (Xu, message, server, args, client) => {
   if(args[0] == null) {
      return Xu.SendEmbed(message.channel, "Include a description!", Xu.COLOR_ERROR);
   }

   var description = args.join(' ');
   var date = new Date();
   var datetime = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()} at ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

   var report = `REPORT by ${Xu.users[message.author.id].username} on ${datetime} as follows:\n${description}\nEND\n\n`

   fs.appendFile('./reports.txt', report, function (err) {
      if (err) return console.log(err);
      console.log(`Error reported by ${Xu.users[message.author.id].username}!`);
   });

   return Xu.SendEmbed(message.channel, `You have submitted a report on ${datetime}. Thank you.`, Xu.COLOR_INFO);
}
