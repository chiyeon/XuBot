function ActiveAbility(description, castDescription, baseDamage, intMultiplier, strMultiplier, tier) {
   this.description = description;
   this.castDescription = castDescription;
   this.baseDamage = baseDamage;
   this.intMultiplier = intMultiplier;
   this.strMultiplier = strMultiplier;

   this.tier = tier       // Common, Uncommon, Mythical
}

function PassiveAbility(type, description, castDescription, tier, ability) {
   this.type = type;
   this.description = description;
   this.castDescription = castDescription;
   this.tier = tier;
   this.Enact = ability;      // takes in array battleusers of each user, currentUser (currently their turn, going first), otherUser (opposite of current), activeUser (currently looking at passive), and opposite
}

module.exports.activeAbilities = {
   "Tackle": new ActiveAbility(
      "A full body tackle",
      "smashes into their opponent with their entire body!",
      3,
      0,
      1,
      "Common"
   ),
   "Slash": new ActiveAbility(
      "A quick, viscious cut",
      "visciously slashes at their opponent, cutting them deeply!",
      10,
      0,
      .5,
      "Common"
   ),
   "Sleep": new ActiveAbility(
      "zzz",
      "zzz",
      20,
      .7,
      .7,
      "Mythical"
   ),
   "Fart Explosion": new ActiveAbility(
      "A loud, disgustingly pungent fart",
      "releases a disgustingly pungent odor into the battlefield!",
      5,
      0,
      .6,
      "Uncommon"
   ),
   "Snowstorm": new ActiveAbility(
      "A biting winter storm",
      "calls forth a winter storm upon the battlefield!",
      10,
      .5,
      0,
      "Uncommon"
   ),
   "Fuyu no Ken": new ActiveAbility(
      "A 10 hit combo with a blade colder than ice",
      "slashes their opponent, freezing the battlefield!",
      10,
      0,
      1,
      "Mythical"
   ),
   "Akalahandra Vitar": new ActiveAbility(
      "A blow of mystical energy",
      "empowers their hands with mystical energy, striking their opponent!",
      5,
      .5,
      .5,
      "Uncommon"
   ),
   "Enchanted Diamond Sword": new ActiveAbility(
      "A cut with a fully enchanted diamond sword",
      "equips their fully enchanted diamond sword, slashing their opponent!",
      15,
      .5,
      1,
      "Mythical"
   ),
   "EXPLOSION!": new ActiveAbility(
      "A massive explosion!",
      "summons the will of fire to decimate the battlefield!",
      20,
      .5,
      0,
      "Mythical"
   ),
   "Unleash Da Beast": new ActiveAbility(
      "Darker than the darkest night\nDeeper than the deepest sea\nUnleash da Beast!",
      "unleashes the Beast upon the world, wreaking havoc!",
      0,
      0,
      10,
      "Mythical"
   ),
   "Filcanthry Alakania": new ActiveAbility(
      "A devastating magical spell",
      "",
      5,
      1,
      0,
      "Mythical"
   ),
   "Blessed of the Arcanes": new ActiveAbility(
      "call forth the blessing of the Arcanes!",
      "invokes the blessing of the Arcanes, striking with intense magical power!",
      0,
      2,
      0,
      "Mythical"
   ) ,
   "Hinokami Kagura": new ActiveAbility(
      "A strike "
   )
}

module.exports.passiveAbilities = {
   "Windforce Maxim": new PassiveAbility(
      "pre-battle",
      "Attack first regardless of user DEX. If both users have this blessing, flip a coin.",
      "'s blessing gives them incredible speed!",
      "Mythical",
      (currentUser, otherUser) => {
         // special case
      }
   ),
   "Lamb's Respite": new PassiveAbility(
      "on-death",
      "On death attack one more time. If victorious, revive.",
      "But they refused to die!",
      "Mythical",
      (currentUser, otherUser) => {
         currentUser.health = 1;
      }
   ),
   "Cursed Touch": new PassiveAbility(
      "pre-battle",
      "Deal damage to the opponent equivalent to this user's level at the start of the battle.",
      "'s blessing curses their opponent, dealing damage!",
      "Uncommon",
      (currentUser, otherUser) => {
         otherUser.health -= currentUser.level;
      }
   ),
   "Book Reader": new PassiveAbility(
      "pre-battle",
      "Gain 5 INT at the start of a battle.",
      " begins to read, granting them 5 INT for this battle!",
      "Common",
      (currentUser, otherUser) => {
         currentUser.stats.int += 5;
      }
   ),
   "Sharpened Blades": new PassiveAbility(
      "pre-battle",
      "Gain 5 STR at the start of a battle.",
      " sharpens their weapons, granting them 5 STR for this battle!",
      "Common",
      (currentUser, otherUser) => {
         currentUser.stats.str += 5;
      }
   ),
   "Scholarly Focus": new PassiveAbility(
      "pre-battle",
      "Gain 10 INT at the start of a battle.",
      " begins to focus, granting them 10 INT for this battle!",
      "Uncommon",
      (currentUser, otherUser) => {
         currentUser.stats.int += 10;
      }
   ),
   "Hunter's Focus": new PassiveAbility(
      "pre-battle",
      "Gain 10 STR at the start of a battle.",
      " begins to focus, granting them 10 STR for this battle!",
      "Uncommon",
      (currentUser, otherUser) => {
         currentUser.stats.str += 10;
      }
   ),
   "Blade Dance": new PassiveAbility(
      "pre-battle",
      "Increase STR by 20% at the start of a battle.",
      " empowers their weaponry, granting them a 20% STR increase for this battle!",
      "Mythical",
      (currentUser, otherUser) => {
         currentUser.stats.str *= 1.2;
      }
   ),
   "Blessing of the Arcanes": new PassiveAbility(
      "pre-battle",
      "Increase INT by 20% at the start of a battle.",
      "'s blessing empowers them, granting them a 20% INT increase for this battle!",
      "Mythical",
      (currentUser, otherUser) => {
         currentUser.stats.int *= 1.2;
      }
   ),
   "Warden": new PassiveAbility(
      "pre-battle",
      "Increase HP by 10 at the start of a battle.",
      " solidifies their defenses, granting them +10 HP for this battle!",
      "Common",
      (currentUser, otherUser) => {
         currentUser.health += 10;
         currentUser.maxHealth += 10;
      }
   ),
   "Shieldbearer": new PassiveAbility(
      "pre-battle",
      "Increase HP by 25 at the start of a battle.",
      " solidifies their defenses, granting them +25 HP for this battle!",
      "Uncommon",
      (currentUser, otherUser) => {
         currentUser.health += 25;
         currentUser.maxHealth += 25;
      }
   ),
   "Dakalavian Hide Armor": new PassiveAbility(
      "pre-battle",
      "Increase HP by 20% at the start of a battle.",
      "'s powerful hide armor grants them a 20% HP increase for this battle!",
      "Mythical",
      (currentUser, otherUser) => {
         currentUser.health *= 1.2;
         currentUser.maxHealth *= 1.2;
      }
   ),

}