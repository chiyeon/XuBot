const Discord = require('discord.js');
const coins = require('./coins.js');

module.exports.Description = coins.Description;
module.exports.Usage = coins.Usage;

module.exports.Run = async (Xu, message, server, args, client) => {
	coins.Run(Xu, message, server, args);
}
