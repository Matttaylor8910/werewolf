(function() {
  angular
    .module('werewolf')
    .factory('constants', constants);

  function constants() {
    var service = {
      roles: allRoles()
    };

    return service;

    /**
     * Returns the local master list of roles
     * @returns {*[]}
     */
    function allRoles() {
      return [
        {
          name: 'Apprentice Seer',
          weight: '+4',
          max: 1,
          active: true,
          supported: false,
          team: 'villager',
          url: 'img/cards/apprentice-seer.png',
          description: 'Become the Seer if the Seer is killed.'
        },
        {
          name: 'Aura Seer',
          weight: '+3',
          max: 1,
          active: true,
          supported: false,
          team: 'villager',
          url: 'img/cards/aura-seer.png',
          description: 'At night, find the team of one player. (variation: At night, find out if someone has a non-ordinary role and what it is).'
        },
        {
          name: 'Beholder',
          weight: '+2',
          max: 1,
          active: false,
          supported: false,
          team: 'villager',
          url: undefined,
          description: 'Opens his eyes the first night to see who the seer is.'
        },
        {
          name: 'Big Bad Wolf',
          weight: '-9',
          max: 1,
          active: false,
          supported: false,
          team: 'wolf',
          url: undefined,
          description: 'If the werewolves target is beside you, you can kill any combination of your adjacent players. However, if the leprechaun redirects the initial attack, none of your adjacent players die. (variation: you can attack one person beside the initial werewolf target.)'
        },
        {
          name: 'Bogeyman',
          weight: '-6',
          max: 1,
          active: false,
          supported: false,
          team: 'bogeyman',
          url: undefined,
          description: 'If the wolves can\'t decide who to kill, you\'ll do it for them. You win if all the night-active players are dead.'
        },
        {
          name: 'Bodyguard',
          weight: '+3',
          max: 1,
          active: true,
          supported: true,
          team: 'villager',
          url: 'img/cards/bodyguard.png',
          description: 'Choose a different player each night to protect. That player cannot be killed that night.'
        },
        {
          name: 'Count Dracula',
          weight: '-2',
          max: 1,
          active: false,
          supported: false,
          team: 'dracula',
          url: undefined,
          description: 'Each night, pick a player to be a wife. If you make it through a day/night cycle with 3 wives, you win.'
        },
        {
          name: 'Cult Leader',
          weight: '+1',
          max: 1,
          active: true,
          supported: true,
          team: 'cult',
          url: 'img/cards/cult-leader.png',
          description: 'Each night, choose a player to join your cult. If all players are in your cult, you win.'
        },
        {
          name: 'Cupid',
          weight: '-3',
          max: 1,
          active: true,
          supported: true,
          team: 'villager',
          url: 'img/cards/cupid.png',
          description: 'Choose two players to be lovers. If one of those players dies, the other dies from a broken heart.'
        },
        {
          name: 'The Count',
          weight: '+5',
          max: 1,
          active: false,
          supported: false,
          team: 'villager',
          url: undefined,
          description: 'The first night, you are told how many werewolves there are in each half of the village.'
        },{
          name: 'Cursed',
          weight: '-3',
          max: 1,
          active: false,
          supported: false,
          team: 'villager',
          url: undefined,
          description: 'You are a villager until attacked by werewolves, at which time you become a werewolf. (variation: You become a vampire when attacked by vampires.)'
        },
        {
          name: 'Doppelgänger',
          weight: '-2',
          max: 1,
          active: true,
          supported: false,
          team: 'villager',
          url: 'img/cards/doppelganger.png',
          description: 'Select a player the first night. If that player dies, you secretly take that role.'
        },
        {
          name: 'Dream Wolf',
          weight: '-5',
          max: 1,
          active: false,
          supported: false,
          team: 'wolf',
          url: undefined,
          description: 'If a werewolf dies, you replace them (you\'re not allowed to wake up until a werewolf dies.)'
        },
        {
          name: 'Drunk',
          weight: '+3',
          max: 1,
          active: true,
          supported: false,
          team: 'villager',
          url: 'img/cards/drunk.png',
          description: 'You are a villager until the third night, when you remember your real role.'
        },
        {
          name: 'Diseased',
          weight: '+3',
          max: 1,
          active: true,
          supported: true,
          team: 'villager',
          url: 'img/cards/diseased.png',
          description: 'If you are attacked by werewolves, the werewolves do not get fed the following night.'
        },
        {
          name: 'Fruit Brute',
          weight: '-3',
          max: 1,
          active: false,
          supported: true,
          team: 'wolf',
          url: undefined,
          description: 'If you are the last wolf left alive, you lose your appetite and cannot feed, but you are trying to root out all the villagers.'
        },
        {
          name: 'Ghost',
          weight: '+2',
          max: 1,
          active: true,
          supported: false,
          team: 'villager',
          url: 'img/cards/ghost.png',
          description: 'Die the first night, then each day, write one letter clues as a message from the beyond (no names or initials).'
        },
        {
          name: 'Hunter',
          weight: '+3',
          max: 1,
          active: true,
          supported: true,
          team: 'villager',
          url: 'img/cards/hunter.png',
          description: 'If you are killed, take someone down with you.'
        },
        {
          name: 'Village Idiot',
          weight: '+2',
          max: 1,
          active: true,
          supported: true,
          team: 'villager',
          url: 'img/cards/village-idiot.png',
          description: 'Always vote for players to die.'
        },
        {
          name: 'Insomniac',
          weight: '+3',
          max: 1,
          active: false,
          supported: false,
          team: 'villager',
          url: undefined,
          description: 'Each night, learn at least one of your neighbors has woken up during the night.'
        },
        {
          name: 'Lycan',
          weight: '-1',
          max: 1,
          active: true,
          supported: true,
          team: 'villager',
          url: 'img/cards/lycan.png',
          description: 'You are a villager, but you appear falsely to be a werewolf to the Seers and PI.'
        },
        {
          name: 'Wolf Man',
          weight: '-9',
          max: 1,
          active: false,
          supported: true,
          team: 'wolf',
          url: undefined,
          description: 'You wake with the other Werewolves each night, but the Seer sees you as a Villager'
        },
        {
          name: 'Martyr',
          weight: '+3',
          max: 1,
          active: false,
          supported: false,
          team: 'unknown',
          url: undefined,
          description: 'Take the place of someone who has been killed before their role is revealed.'
        },
        {
          name: 'Mason',
          weight: '+2',
          max: 3,
          active: true,
          supported: false,
          team: 'villager',
          url: 'img/cards/mason.png',
          description: 'You know who the other Masons are.'
        },
        {
          name: 'Mayor',
          weight: '+2',
          max: 1,
          active: true,
          supported: true,
          team: 'villager',
          url: 'img/cards/mayor.png',
          description: 'Your vote counts twice when voting to lynch a player if you reveal yourself.'
        },
        {
          name: 'Old Hag',
          weight: '+1',
          max: 1,
          active: true,
          supported: true,
          team: 'villager',
          url: 'img/cards/old-hag.png',
          description: 'At night, indicate a player who must leave the village the next day.'
        },
        {
          name: 'Old Man',
          weight: '+0',
          max: 1,
          active: false,
          supported: false,
          team: 'unknown',
          url: undefined,
          description: 'You will die on night X, where X is the number of werewolves in the game plus one.'
        },
        {
          name: 'P.I.',
          weight: '+3',
          max: 1,
          active: true,
          supported: false,
          team: 'villager',
          url: 'img/cards/pi.png',
          description: 'Once per game, Inspect three players (they must be beside each other). You only know if at least one of them is malicious. (variation: Inspect three adjacent players on one night).'
        },
        {
          name: 'Pacifist',
          weight: '-1',
          max: 1,
          active: true,
          supported: true,
          team: 'villager',
          url: 'img/cards/pacifist.png',
          description: 'You cannot vote when lynching.'
        },
        {
          name: 'Priest',
          weight: '+3',
          max: 1,
          active: true,
          supported: false,
          team: 'villager',
          url: 'img/cards/priest.png',
          description: 'On the first night, protect a player. The next attempt to kill the player fails. The night after that attempt, you protect a different player. (variation: Protect one player from death caused at night, including vampire attacks.)'
        },
        {
          name: 'Prince',
          weight: '+3',
          max: 1,
          active: true,
          supported: true,
          team: 'villager',
          url: 'img/cards/prince.png',
          description: 'You can\'t be lynched.'
        },
        {
          name: 'Seer',
          weight: '+7',
          max: 1,
          active: true,
          supported: true,
          team: 'villager',
          url: 'img/cards/seer.png',
          description: 'Each night, point at a player and learn if they are: Either on the villager team, or a vampire.'
        },
        {
          name: 'Spellcaster',
          weight: '+1',
          max: 1,
          active: true,
          supported: true,
          team: 'villager',
          url: 'img/cards/spellcaster.png',
          description: 'At night, indicate a player who must not use their voice the following day.'
        },
        {
          name: 'Tough Guy',
          weight: '+3',
          max: 1,
          active: true,
          supported: true,
          team: 'villager',
          url: 'img/cards/tough-guy.png',
          description: 'You survive an extra day if attacked by werewolves at night.'
        },
        {
          name: 'Troublemaker',
          weight: '+2',
          max: 1,
          active: true,
          supported: false,
          team: 'villager',
          url: 'img/cards/troublemaker.png',
          description: 'Once per game, choose to have two lynch attempts on one day. If the votes are tied, then you\'ve wasted your chance.'
        },
        {
          name: 'Thing',
          weight: '+3',
          max: 1,
          active: false,
          supported: false,
          team: 'unknown',
          url: undefined,
          description: 'Each night, tap a player sitting immediately next to you.'
        },
        {
          name: 'Villager',
          weight: '+1',
          max: 20,
          active: true,
          supported: true,
          team: 'villager',
          url: 'img/cards/villager.png',
          description: 'Find the werewolves and lynch them.'
        },
        {
          name: 'Witch',
          weight: '+4',
          max: 1,
          active: true,
          supported: false,
          team: 'villager',
          url: 'img/cards/witch.png',
          description: 'Kill or save a player, once each per game.'
        },
        {
          name: 'Sorceress',
          weight: '-3',
          max: 1,
          active: true,
          supported: true,
          team: 'wolf',
          url: 'img/cards/sorceress.png',
          description: 'You are a seer, but you are on the Werewolf team. You only know if you\'ve found the Seer.'
        },
        {
          name: 'Minion',
          weight: '-6',
          max: 1,
          active: true,
          supported: false,
          team: 'wolf',
          url: 'img/cards/minion.png',
          description: 'Work with the werewolves or vampires to kill the villagers. The moderator decides whether you work with the werewolves or the vampires.'
        },
        {
          name: 'Werewolf',
          weight: '-6',
          max: 12,
          active: true,
          supported: true,
          team: 'wolf',
          url: 'img/cards/werewolf.png',
          description: 'Eat a villager each night.'
        },
        {
          name: 'Wolf Cub',
          weight: '-8',
          max: 1,
          active: true,
          supported: false,
          team: 'wolf',
          url: 'img/cards/wolf-cub.png',
          description: 'If you die, the werewolves get two kills the following night.'
        },
        {
          name: 'Hoodlum',
          weight: '+0',
          max: 1,
          active: true,
          supported: true,
          team: 'hoodlum',
          url: 'img/cards/hoodlum.png',
          description: 'Indicate two players on the first night. If they die and you are alive at the end of the game, you win.'
        },
        {
          name: 'Tanner',
          weight: '-2',
          max: 1,
          active: true,
          supported: true,
          team: 'tanner',
          url: 'img/cards/tanner.png',
          description: 'You only win if you are killed.'
        },
        {
          name: 'Lone Wolf',
          weight: '-5',
          max: 1,
          active: true,
          supported: false,
          team: 'unknown',
          url: 'img/cards/lone-wolf.png',
          description: 'You are a werewolf, but you only win if you are the last wolf team member alive.'
        },
        {
          name: 'Vampire',
          weight: '-7',
          max: 8,
          active: true,
          supported: false,
          team: 'vampire',
          url: 'img/cards/vampire.png',
          description: 'Each night, Choose a player. That player is eliminated when a player gets their 2nd accusation the next day.'
        },
        {
          name: 'Little Girl',
          weight: '+0',
          max: 1,
          active: false,
          supported: false,
          team: 'villager',
          url: undefined,
          description: 'Like a villager but each night she gets to peek out but be discrete so the wolves don\'t notice, because they can signal the moderator if they think you are the little girl. You die if the wolves\' accusation was correct.'
        },
        {
          name: 'Wild Child',
          weight: '+0',
          max: 1,
          active: false,
          supported: false,
          team: 'villager',
          url: undefined,
          description: 'On the first night, the Wild Child chooses 1 "role model," and if the role model dies, the wild child becomes a werewolf. Until then, the wild child is a normal villager.'
        },
        {
          name: 'Sasquatch',
          weight: '-2',
          max: 1,
          active: false,
          supported: false,
          team: 'villager',
          url: undefined,
          description: 'You are a villager until a day ends without a lynch, in which case you become a werewolf.'
        },
        {
          name: 'Leprechaun',
          weight: '+5',
          max: 1,
          active: false,
          supported: false,
          team: 'villager',
          url: undefined,
          description: 'You can redirect werewolf attacks to players adjacent to the target(s), but you don\'t have to.'
        },
        {
          name: 'Bloody Mary',
          weight: '+1',
          max: 1,
          active: false,
          supported: false,
          team: 'unknown',
          url: undefined,
          description: 'If you die, kill someone from the team that killed you each night.'
        },
        {
          name: 'Chupacabra',
          weight: '+4',
          max: 1,
          active: false,
          supported: false,
          team: 'unknown',
          url: undefined,
          description: 'Each night, select a player. If they are a werewolf, they die. If they aren\'t a werewolf, they don\'t die. If all the wolves are dead, kill a player each night.'
        },
        {
          name: 'Nostradamus',
          weight: '+1',
          max: 1,
          active: false,
          supported: false,
          team: 'villager',
          url: undefined,
          description: 'Predict the winning team on the 1st night. If that team wins AND you are alive at the end of the game, you get a solo win. For the rest of the game you are a villager.'
        },
        {
          name: 'Dire Wolf',
          weight: '-4',
          max: 1,
          active: false,
          supported: false,
          team: 'wolf',
          url: undefined,
          description: 'On the first night choose a companion. You die if they die, but if you die they don\'t die. You are on the wolf team. (variation: Put yourself in love on the first night).'
        }
      ]
    }
  }
})();
