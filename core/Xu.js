const Discord = require("discord.js");
require('dotenv').config();

var uri = process.env.MONGO_URI;

const mongoClient = require('mongodb').MongoClient(uri, {useUnifiedTopology: true});

// === BOT DATA ======

//key
module.exports.loginToken = process.env.DISCORD_TOKEN;

//reference to all servers, use server ID as key to obtain server object
module.exports.servers = {};
module.exports.users = null;

//prefix for bot commands
module.exports.prefix = 'x ';

// current version of teh bot
module.exports.version = 0.3;

//color selectors:
module.exports.normal = 0;
module.exports.error = 1;
module.exports.info = 2;

//common colors for sending messages
module.exports.colors = [
   '#9bcfcd',
   '#d67c93',
   '#8db598'
];

// === BOT COMMON FUNCTIONS ======

//activate when bot is starting up
module.exports.Startup = async function() {
   try {
      await mongoClient.connect();
   } finally {
      
   }
}

module.exports.SaveServerData = async function(server, serverID) {
   mongoClient.db("XuBot").collection("servers").updateOne(
      { _id: serverID },
      { $set: { server } },
      { upsert: true }
   );

   // spam console.log("Successfully saved data to servers collection!");
}

module.exports.SaveUserData = async function() {
   var users = this.users;
   mongoClient.db("XuBot").collection("users").updateOne(
      { _id: "UserData" },
      { $set: { users } },
      { upsert: true }
   ); 
}

module.exports.LoadServerData = async function(serverID) {
   var server = await mongoClient.db("XuBot").collection("servers").findOne({ _id: serverID });
   if(server != null) {
      return server.server;
   } else {
      return null;
   }
}

module.exports.LoadUserData = async function() {
   var users = await mongoClient.db("XuBot").collection("users").findOne({ _id: "UserData"});
   if(users != null) {
      return users.users;
   } else {
      return null;
   }
}

//create a server in the servers[] database
module.exports.CreateServer = function() {
   return {
      thing: false
   }
}

//creates a user instance, unique to each server
module.exports.CreateUser = function() {
   return {
      xuser: false, //admin status
      xucoins: 0, //# of points
      xp: 0, // xp
      level: 1,
      class: "",
      house: "",
      inventory: [], //inventory
      stats: {
         'strength': 1,
         'intelligence': 1,
         'dexterity': 1,
         'charisma': 1
      }
   }
}

//send a simple embed with only normal text inside
module.exports.SendEmbed = function(channel, contents, color) {
   channel.send(new Discord.MessageEmbed()
      .setColor(color)
      .setDescription(contents)
   );
}

//overide for an embed with a title and normal text
module.exports.SendEmbedWithTitle = function(channel, title, contents, color) {
   channel.send(
      new Discord.MessageEmbed()
         .setColor(color)
         .setTitle(title)
         .setDescription(contents)
   );
}

// add xp to a user
module.exports.AddXP = function(user, xp, channel) {
   user.xp += xp;

   var targetXP = user.level * user.level;
   var leveled = false;

   while(user.xp >= targetXP) {
      user.xp -= targetXP;
      user.level++;

      targetXP = user.level * user.level;
      leveled = true;
   }

   if(leveled)
      this.SendEmbed(channel, `Leveled to ${user.level}!`, this.colors[this.info]);
}
