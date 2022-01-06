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
module.exports.version = 0.5;

//color selectors:
module.exports.COLOR_NORMAL = '#9bcfcd';
module.exports.COLOR_ERROR = '#d67c93';
module.exports.COLOR_INFO = '#8db598';
module.exports.COLOR_WISTERIA = '#ab88bf';
module.exports.COLOR_CONQUEROR = '#e06453';
module.exports.COLOR_ARCANA = '#5b75ba';

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
      thing: false,
      pendingDuels: [],
      activeDuels: [],
      duellingUsers: [], // optimzation
   }
}

//creates a user instance
module.exports.CreateUser = function(_username) {
   return {
      username: _username,
      busy: false,
      xuser: false, //admin status
      xucoins: 0, //# of points
      xp: 0, // xp
      level: 1,
      class: "User",
      house: "No",
      activeAbility: "Tackle",
      passiveAbility: "",
      wins: 0,
      losses: 0,
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

   var targetXP = this.GetTargetXP(user.level);
   var leveled = false;

   if(user.xp < 0)
      user.xp = 0;

   while(user.xp >= targetXP) {
      user.xp -= targetXP;
      user.level++;

      targetXP = this.GetTargetXP(user.level);
      leveled = true;
   }

   if(leveled)
      this.SendEmbed(channel, `Leveled to ${user.level}!`, this.COLOR_INFO);
}

module.exports.GetTargetXP = function(level) {
   return Math.floor(level * 10 + (level * level * (level * 0.25)));
}
