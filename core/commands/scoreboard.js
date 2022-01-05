//list the 10 users with the most XuCoins.

const Discord = require('discord.js');

module.exports.Description = () => {
	return "The top 10 XuCoin holders";
}

module.exports.Run = async (Xu, message, server, args, client) => {
	//convert users object into an array with the key as the user id and the value as the number of points
	var pointsArray = Object.keys(Xu.users).map(function(key) {
		return [key, Xu.users[key].xucoins];
	});
	
	var embed = new Discord.MessageEmbed()
	.setColor(Xu.colors[Xu.normal])
	.setTitle('SCOREBOARD')
	.setTimestamp();
	
	//sort greatest to least
	pointsArray.sort(function(a, b) {
		if(a[1] === b[1]) {
			return 0;
		} else {
			return (a[1] > b[1]) ? -1 : 1;
		}
	});
	
	for(var i = 0; i < 10; i++) {
		if(pointsArray[i]) {
			var u = client.users.cache.get(pointsArray[i][0].toString());
			
			//verify existence
			if(u == null)
				continue;
			
			var username = u.username;
			var points = pointsArray[i][1];
			embed.setColor(Xu.colors[Xu.normal]);
			embed.addField(`[${(i + 1)}] ${username}`, `${points} XuCoins`, false);
			
		}
	}
	   
   message.channel.send(embed);
}
