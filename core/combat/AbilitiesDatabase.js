function ActiveAbility(description, castDescription, baseDamage, intMultiplier, strMultiplier, tier) {
   this.description = description;
   this.castDescription = castDescription;
   this.baseDamage = baseDamage;
   this.intMultiplier = intMultiplier;
   this.strMultiplier = strMultiplier;

   this.tier = tier       // Common, Uncommon, Mythical
}

module.exports.activeAbilities = {
   "Tackle": new ActiveAbility(
      "A full body tackle",
      "smashes into their opponent with their entire body!",
      5,
      0,
      1,
      "Common"
   ),
   "Slash": new ActiveAbility(
      "A quick, viscious cut",
      "visciously slashes at their opponent, cutting them deeply!",
      10,
      0,
      1,
      "Common"
   ),
   "Fart Explosion": new ActiveAbility(
      "A loud, disgustingly pungent fart",
      "releases a disgustingly pungent odor into the battlefield!",
      5,
      0,
      3,
      "Uncommon"
   ),
   "Snowstorm": new ActiveAbility(
      "A biting winter storm",
      "calls forth a winter storm upon the battlefield!",
      10,
      1,
      0,
      "Uncommon"
   ),
   "Fuyu no Ken": new ActiveAbility(
      "A 10 hit combo with a blade colder than ice",
      "slashes their opponent, freezing the battlefield!",
      20,
      0,
      2,
      "Mythical"
   ),
   "Akalahandra Vitar": new ActiveAbility(
      "A blow of mystical energy",
      "empowers their hands with mystical energy, striking their opponent!",
      10,
      1,
      1,
      "Mythical"
   ),
   "Enchanted Diamond Sword": new ActiveAbility(
      "A cut with a fully enchanted diamond sword",
      "equips their fully enchanted diamond sword, slashing their opponent!",
      25,
      1,
      1,
      "Mythical"
   ),
   "EXPLOSION!": new ActiveAbility(
      "A massive explosion!",
      "summons the will of fire to decimate the battlefield!",
      30,
      1,
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
      50,
      2,
      0,
      "Mythical"
   ),
}

module.exports.passiveAbilities = {
   "Lamb's Respite": {
      description: "On death attack one more time. If victorious, revive."
   }
}