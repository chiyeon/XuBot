//show how many xucoins the user has

const Discord = require('discord.js');
const coins = require('./coins.js');

module.exports.Description = () => {
	return coins.Description();
}

module.exports.Run = async (Xu, message, server, args, client) => {
	coins.Run(Xu, message, server, args);
}
