const Discord = require('discord.js');
const Xu = require('./core/Xu.js');

const client = new Discord.Client();

client.once('ready', () => {
   //client.user.setActivity()

   Xu.Startup();

   console.log("XuBot has awoken!");
});

client.on('message', message => {

   // === REFERENCES =====

   //active guild's server object
   var server;
   //every word the user sent INCLUDING the command
   var args;
   var command;

   //do NOT respond to bot messages
   if(message.author.bot)
      return;

   
   //make sure servers and users exist, then handle commands
   VerifyServerIntegrity(message).then(() => {
      if(!message)
         return;
      
      //set references
      server = Xu.servers[message.guild.id];
      
      //deal with commands here
      if(message.content.startsWith(Xu.prefix)) {
         //first remove any extra spaces
         //remove the prefix
         //seperate into an array by word
         //remove the command and put it into its own variable, to lowered
         args = message.content.replace(/\s+/g, " ").substring(Xu.prefix.length).split(' ');
         command = args.shift().toLowerCase();

         //if admin only, first check some admin commands
         if(Xu.users[message.author.id].xuser) {
				try {
					RunAdminCommand(command, message, server, args, client);
					return;
				} catch {
					
				}
         }

         
         //try to run the command, recommend help if broken
         try {
            RunCommand(command, message, server, args, client);
         } catch {
            try {
               RunAlias(command, message, server, args, client);
            } catch {
               Xu.SendEmbed(message.channel, `I didn't quite understand that. Try ${Xu.prefix}help to see a list of avaliable commands!`, Xu.COLOR_ERROR);
            }
         }
      }
   });
   
   /*
   if(message.content.toLowerCase().includes('now')) {
      //message.channel.send('https://youtu.be/0aRg74S4EM4?t=1477');
   }

   if(message.author.id == '270049593364971520' || message.author.id == '384865527639572491' || message.author.id == '719099408620322827') {
      message.channel.send(message.content);
   }

   if(message.author.id == '193522911359926272') {
      if(message.content.toLowerCase() == 'i command thee to roll') {
         message.channel.send(';p');
      } else if(message.content.toLowerCase() == 'i command thee to use a pokeball') {
         message.channel.send('pb');
      }
   }*/
});

//login using token
client.login(Xu.loginToken);

//verifies that Xu.js has a proper server object, and that each user has a corresponding user profile in the database
async function VerifyServerIntegrity(message) {
   //check if user database exists
   if(Xu.users == null) {
      console.log("Loading users database...");

      //first attempt to retrieve from collections
      //Xu.servers[message.guild.id] = await Xu.LoadData(message.guild.id);
      Xu.users = await Xu.LoadUserData();
      if(Xu.users == null)
         Xu.users = {};

      /*
      if(Xu.servers[message.guild.id] == null) {
         console.log("Fresh server! Generating server object. . .");
         Xu.servers[message.guild.id] = await Xu.CreateServer();
         console.log(`Successfully generated new Server with ID ${message.guild.id}`);
         await Xu.SaveServer();
      }
      */
   }

   //check if user exists in the database
   if(Xu.users[message.author.id] == null) {
      console.log("Fresh user! Generating user object. . .");
      Xu.users[message.author.id] = await Xu.CreateUser(message.author.username);
      console.log(`Successfully generated new User with ID ${message.author.id}`);
      await Xu.SaveUserData();
   }
}

//runs a command given the name. searches the ./core/commands folder for a corresponding .js file. surround with try / catch block !
function RunCommand(command, message, server, args, client) {
   require(`./core/commands/${command}.js`).Run(Xu, message, server, args, client);
}

function RunAlias(command, message, server, args, client) {
   require(`./core/commands/${require('./core/aliases.js').list[command]}.js`).Run(Xu, message, server, args, client);
}

function RunAdminCommand(command, message, server, args, client) {
	require('./core/admin_commands/' + command + '.js').Run(Xu, message, server, args, client);
}
