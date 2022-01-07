const Discord = require("discord.js");

function BattleUser(level, name, maxHealth, attack, passive, stats) {
   this.level = level;
   this.name = name;
   this.health = maxHealth;
   this.maxHealth = maxHealth;
   this.attack = attack;
   this.passive = passive;
   this.stats = stats;
   this.initialStats = {
      str: stats.str,
      int: stats.int,
      dex: stats.dex,
      chr: stats.chr
   }

   this.GetHealthBar = () => {
      var healthBar = "";

      var progress = this.health / this.maxHealth * 6;

      for(var i = 0; i < 6; i++) {
         if(i < progress)
            healthBar += ":red_square:"
         else 
            healthBar += ":white_large_square:"
      }

      return healthBar;
   }

   this.GetAttackDamage = (AbilityDatabase) => {
      var damage = 0;
      var attData = AbilityDatabase[this.attack];

      damage = attData.baseDamage;
      damage += this.stats.int * attData.intMultiplier;
      damage += this.stats.str * attData.strMultiplier;
      //damage += this.level;

      return Math.floor(damage);
   }
}

function GetOtherPlayer(currentPlayer) {
   if(currentPlayer == 0)
      return 1;
   
   return 0;
}

/*
var ActiveAbilitiesDatabase = require("./core/combat/AbilitiesDatabase.js").activeAbilities; 
var loser;
var winner;

while(challenger.health > 0 && challenged.health > 0) {
   // do a turn
   
   // who goes first ?
   var first = challenger;
   var second = challenged;
   if(challengedUser.stats.dexterity > challengerUser.stats.dexterity) {
      first = challenged;
      second = challenger;
   }
   
   second.health -= first.GetAttackDamage(ActiveAbilitiesDatabase);
   PrintDuel(`${first.name} uses ${first.attack}, dealing ${first.GetAttackDamage(ActiveAbilitiesDatabase)} damage!. ${first.name} ${ActiveAbilitiesDatabase[first.attack].cast}`)

   if(second.health <= 0) {
      second.health = 0;
      loser = second;
      winner = first;
      break;
   }
   
   first.health -= second.GetAttackDamage(ActiveAbilitiesDatabase);
   PrintDuel(`${second.name} uses ${second.attack}, dealing ${second.GetAttackDamage(ActiveAbilitiesDatabase)} damage!. ${second.name} ${ActiveAbilitiesDatabase[second.attack].cast}`)

   if(first.health <= 0) {
      first.health = 0;
      loser = first;
      winner = second;
      break;
   }
}

PrintDuel(`The Duel has ended! ${winner.name} has won!`);

if(winner.name == challengerUser.username) {
   challengerUser.wins++;
   challengedUser.losses++;
} else {
   challengedUser.wins++;
   challengerUser.losses++;
}

Xu.SaveUserData();
*/
module.exports.Battle = async (Xu, channel, userIDs) => {
   var previousMessage = null;

   // function prints da duel or edits when needed
   async function PrintDuel(title, description) {
      var embed = new Discord.MessageEmbed()
         .setColor(Xu.COLOR_INFO)
         .addFields(
            { name: battleUsers[0].level + " " + battleUsers[0].name, value: `${battleUsers[0].GetHealthBar()} HP\n${battleUsers[0].health}/${battleUsers[0].maxHealth}`, inline: true },
            { name: battleUsers[1].level + " " + battleUsers[1].name, value: `${battleUsers[1].GetHealthBar()} HP\n${battleUsers[1].health}/${battleUsers[1].maxHealth}`, inline: true },
            { name: title, value: description, inline: true }
         )
   
      if(previousMessage == null) {
         previousMessage = await channel.send(embed);
      } else {
         previousMessage.edit(embed);
      }
   }

   function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

   var battleUsers = [];      // 'battle user' see func above
   var ActiveAbilitiesDatabase = require("./AbilitiesDatabase.js").activeAbilities; // abilities database
   var PassiveAbilitiesDatabase = require("./AbilitiesDatabase.js").passiveAbilities;

   // initialize users
   userIDs.forEach(id => {
      var user = Xu.users[id];
      battleUsers.push(new BattleUser(user.level, user.username, 10 + user.level * 2 + user.bonusHealth, user.activeAbility, user.passiveAbility, user.stats));
   });

   // print starting duel
   await PrintDuel("The Duel Begins!", `${battleUsers[0].name} vs ${battleUsers[1].name}`);

   var currentUser = 1;    // person being challenged has advantage
   if(battleUsers[0].stats.dex > battleUsers[1].stats.dex)
      currentUser = 0;
   
   // PRE BATTLE STUFF
   // check if either users have a pre battle passive

   for(var i = 0; i < 2; i++) {
      var j = currentUser + i;
      if(j == 2) j = 0;
      
      // j is active user (one currently looking at passive)

      // handle special cases then just activate ability
      var passiveAbility = PassiveAbilitiesDatabase[battleUsers[j].passive];
      if(passiveAbility) {
         if(passiveAbility.type == "pre-battle") {
            await sleep(3000).then(() => {
               passiveAbility.Enact(battleUsers[j], battleUsers[GetOtherPlayer(j)]);

               // special case
               if(battleUsers[j].passive == "Windforce Maxim") currentUser = j;

               PrintDuel(`${battleUsers[j].name}'s ${battleUsers[j].passive}`, `${battleUsers[j].name}${passiveAbility.castDescription}`);
            })
         }
      }
   }

   // check special case: do both player's have windforce maxim ?
   if(battleUsers[0].passive == battleUsers[1].passive == "Windforce Maxim")
      currentUser = Math.random() > 0.5 ? 0 : 1;

   var skipBattle = false;
   if(battleUsers[0].health <= 0 || battleUsers[1].health <= 0) {
      skipBattle = true;
   
      // make sure right person is losing
      if(battleUsers[currentUser].health <= 0) {
         currentUser = GetOtherPlayer(currentUser);
      }
   }

   for(;;) {
      if(skipBattle)
         break;
      
      var escape = false;

      await sleep(3000).then(() => {

         var otherUser;
         if(currentUser == 0) otherUser = 1;
         else otherUser = 0

         var abilityDamage = battleUsers[currentUser].GetAttackDamage(ActiveAbilitiesDatabase);

         battleUsers[otherUser].health -= abilityDamage;

         PrintDuel(`${battleUsers[currentUser].name} uses ${battleUsers[currentUser].attack}, dealing ${abilityDamage} damage!`, `${battleUsers[currentUser].name} ${ActiveAbilitiesDatabase[battleUsers[currentUser].attack].castDescription}`)
      
         if(battleUsers[otherUser].health <= 0) {
            battleUsers[otherUser].health = 0;
            escape = true;
         } else {
            currentUser = otherUser;
         }
      })

      if(escape)
         break;
   }

   await sleep(3000).then(() => {
      PrintDuel(`The Duel has ended!`, `${battleUsers[currentUser].name} has won!`);

      var otherUser;
      if(currentUser == 0) otherUser = 1;
      else otherUser = 0

      Xu.users[userIDs[currentUser]].wins++;
      Xu.users[userIDs[currentUser]].stats = battleUsers[currentUser].initialStats;
      Xu.users[userIDs[otherUser]].losses++;
      Xu.users[userIDs[otherUser]].stats = battleUsers[otherUser].initialStats;

      userIDs.forEach(userID => {
         Xu.users[userID].busy = false;
      })

      Xu.SaveUserData();
   })
}