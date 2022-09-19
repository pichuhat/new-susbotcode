/**
 * Commands
 * Cassius - https://github.com/sirDonovan/Cassius
 *
 * This file contains the base commands for Cassius.
 *
 * @license MIT license
 */

'use strict';

// Users who use the settour command when a tournament is already
// scheduled will be added here and prompted to reuse the command.
// This prevents accidentally overwriting a scheduled tournament.
/**@type {Map<string, string>} */
let gameon = false
let activegame = false;
let roomvoicerooms = ['idm'];
let roombotrooms = [];
let gamepllist = [];
let gameroom = '';
let playerturn = '';
let playerturngitnum = 0;
let overwriteWarnings = new Map();
const fullpokes = ["bulbasaur", "ivysaur", "venusaur", "charmander", "charmeleon", "charizard", "squirtle", "wartortle", "blastoise", "caterpie", "metapod", "butterfree", "weedle", "kakuna", "beedrill", "pidgey", "pidgeotto", "pidgeot", "rattata", "raticate", "spearow", "fearow", "ekans", "arbok", "pikachu", "raichu", "sandshrew", "sandslash", "nidoran-f", "nidorina", "nidoqueen", "nidoran-m", "nidorino", "nidoking", "clefairy", "clefable", "vulpix", "ninetales", "jigglypuff", "wigglytuff", "zubat", "golbat", "crobat", "gloom", "vileplume", "paras", "parasect", "venonat", "venomoth", "diglett", "dugtrio", "meowth", "persian", "psyduck", "golduck", "mankey", "primeape", "growlithe", "arcanine", "poliwag", "poliwhirl", "poliwrath", "abra", "kadabra", "alakazam", "machop", "machoke", "machamp", "bellsprout", "weepinbell", "victreebel", "tentacool", "tentacruel", "geodude", "graveler", "golem", "ponyta", "rapidash", "slowpoke", "slowbro", "magnemite", "magneton", "magnezone", "doduo", "dodrio", "seel", "dewgong", "grimer", "muk", "shellder", "cloyster", "gastly", "haunter", "gengar", "onix", "steelix", "hypno", "krabby", "kingler", "voltorb", "electrode", "exeggcute", "exeggutor", "cubone", "marowak", "hitmonlee", "hitmonchan", "lickitung", "koffing", "weezing", "rhyhorn", "rhydon", "chansey", "tangela", "kangaskhan", "horsea", "seadra", "goldeen", "seaking", "staryu", "starmie", "mr. mime", "scyther", "jynx", "electabuzz", "magmar", "pinsir", "tauros", "magikarp", "gyarados", "lapras", "ditto", "eevee", "vaporeon", "jolteon", "flareon", "porygon", "omantyke", "omastar", "kabuto", "kabutops", "aerodactyl", "snorlax", "articuno", "zapdos", "moltres", "dratini", "dragonair", "dragonite", "mewtwo", "mew", "chikorita", "bayleef", "meganium", "cyndaquil", "quilava", "typhlosion", "totodile", "croconaw", "feraligatr", "sentret", "furret", "hoothoot", "noctowl", "ledyba", "ledian", "spinarak", "ariados", "crobat", "chinchou", "lanturn", "pichu", "cleffa", "igglybuff", "togepi", "togetic", "natu", "xatu", "mareep", "flaffy", "ampharos", "bellossom", "marill", "azumarill", "sudowoodo", "politoed", "hoppip", "skiploom", "jumpluff", "aipom", "sunkern", "sunflora", "yanma", "wooper", "quagsire", "espeon", "umbreon", "murkrow", "slowking", "misdreavus", "unown", "wobbuffet", "girafarig", "pineco", "forretress", "dunsparce", "gligar", "steelix", "snubbull", "granbull", "qwilfish", "scizor", "shuckle", "heracross", "sneasel", "teddiursa", "ursaring", "slugma", "magcargo", "swinub", "piloswine", "corsola", "remoraid", "octillery", "delibird", "mantine", "skarmory", "houndour", "houndoom", "kingdra", "phanphy", "donphan", "porygon2", "stantler", "smeargle", "tyrogue", "hitmontop", "smoochum", "elekid", "magby", "miltank", "blissey", "raikou", "entei", "suicune", "larvitar", "pupitar", "tyranitar", "lugia", "ho-oh", "celebi", "treecko", "grovyle", "sceptile", "torchic", "combusken", "blaziken", "mudkip", "marshtomp", "swampert", "poochyena", "mightyena", "zigzagoon", "linoone", "wurmple", "silcoon", "beautifly", "cascoon", "dustox", "lotad", "lombre", "ludicolo", "seedot", "nuzleaf", "shiftry", "tailow", "swellow", "wingull", "pelipper", "ralts", "kirlia", "gardevoir", "surskit", "masquerain", "shroomish", "breloom", "slakoth", "vigoroth", "slaking", "nincada", "ninjask", "shedinja", "whismur", "loudred", "exploud", "makuhita", "hariyama", "azurill", "nosepass", "skitty", "delcatty", "sableye", "mawile", "aron", "lairon", "aggron", "meditite", "medicham", "electrike", "manectric", "plusle", "minun", "volbeat", "illumise", "roselia", "gulpin", "swalot", "carvanha", "sharpedo", "wailmer", "wailord", "numel", "camerupt", "torkoal", "spoink", "grumpig", "spinda", "trapinch", "vibrava", "flygon", "cacnea", "cacturne", "swablu", "altaria", "zangoose", "seviper", "lunatone", "solrock", "barboach", "whiscash", "corphish", "crawdaunt", "baltoy", "claydol", "lileep", "cradily", "anorith", "armaldo", "feebas", "milotic", "castform", "kecleon", "shuppet", "banette", "duskull", "dusclops", "tropius", "chimecho", "absol", "wynaut", "snorunt", "glalie", "spheal", "sealeo", "walrein", "clamperl", "huntail", "gorebyss", "relicanth", "luvdisc", "bagon", "shelgon", "salamence", "beldum", "metang", "metagross", "regirock", "regice", "registeel", "latias", "latios", "kyogre", "groudon", "rayquaza", "jirachi", "deoxys", "turtwig", "grotle", "torterra", "chimchar", "monferno", "infernape", "piplup", "prinplup", "empoleon", "starly", "staravia", "staraptor", "bidoof", "bibarel", "kricketot", "kricketune", "shinx", "luxio", "luxray", "budew", "roserade", "cranidos", "rampardos", "shieldon", "bastiodon", "burmy", "wormadam", "mothim", "combee", "vespiquen", "pachirisu", "buizil", "floatzel", "cherubi", "cherrim", "shellos", "gastrodon", "ambipom", "drifloon", "drifblim", "buneary", "lopunny", "mismagius", "honchcrow", "glameow", "purugly", "chingling", "stunky", "skuntank", "bronzor", "bronzong", "bonsly", "mime jr", "happiny", "chatot", "spiritomb", "gible", "gabite", "garchomp", "munchlax", "riolu", "lucario", "hippopotas", "hippowdon", "skorupi", "drapion", "croagunk", "toxicroak", "carnivine", "finneon", "lumineon", "mantyke", "snover", "abomasnow", "weavile", "magnezone", "lickilicky", "rhyperior", "tangrowth", "electivire", "magmortar", "togekiss", "yanmega", "leafeon", "glaceon", "gliscor", "mamoswine", "porygon-z", "gallade", "probopass", "dusknoir", "froslass", "rotom", "uxie", "mespirit", "azelf", "dialga", "palkia", "heatran", "regigigas", "giratina", "cresselia", "phione", "manaphy", "darkrai", "shaymin", "arceus", "victini", "snivy", "servine", "serperior", "tepig", "pignite", "emboar", "oshawott", "dewott", "samurott", "patrat", "watchog", "lillipup", "herdier", "stoutland", "purrloin", "liepard", "pansage", "simisage", "pansear", "simisear", "panpour", "simipour", "munna", "musharna", "pidove", "tranquill", "unfezant", "blitzle", "zebstrika", "roggenrola", "boldore", "gigalith", "woobat", "swoobat", "drilbur", "excadrill", "audino", "timburr", "gurdurr", "conkeldurr", "tympole", "palpitoad", "seismioad", "throh", "sawk", "sewaddle", "swadloon", "leavanny", "venipede", "whirlipede", "scolipede", "cottonee", "whimsicott", "petilil", "lilligant", "basculin", "sandile", "krokorok", "krookodile", "darumaka", "darmanitan", "maractus", "dwebble", "crustle", "scraggy", "scrafty", "sigilyph", "yamask", "cofagrigus", "tirtouga", "carracosta", "archen", "archeops", "trubbish", "garbodor", "zorua", "zoroark", "minccino", "cinccino", "gothita", "gothorita", "gothitelle", "solosis", "duosion", "reuniclus", "ducklett", "swanna", "vanillite", "vannilish", "vanilluxe", "deerling", "sawsbuck", "emolga", "karrablast", "escavelier", "foongus", "amoonguss", "frillish", "jellicent", "alomamola", "joltik", "galvantula", "ferroseed", "ferrothorn", "klink", "klang", "klinklang", "tynamo", "eelektrik", "eelektross", "elgyem", "beheeyem", "litwick", "lampent", "chandelure", "axew", "fraxure", "haxorus", "cubchoo", "beartic", "cryogonal", "shelmet", "accelgor", "stunfisk", "meinfoo", "meinshao", "druddigon", "golett", "golurk", "pawniard", "bisharp", "bouffalant", "rufflet", "braviary", "vullaby", "mandibuzz", "heatmor", "durant", "deino", "zweilous", "hydreigon", "larvesta", "volcarona", "cobalion", "terrakion", "virizion", "tornadus", "thundurus", "reshiram", "zekrom", "landorus", "kyurem", "keldeo", "meloetta", "genesect", "chespin", "quilladin", "chesnaught", "fennekin", "braixen", "delphox", "froakie", "frogadier", "greninja", "bunnelby", "diggersby", "fletchling", "fletchinder", "talonflame", "scatterbug", "spewpa", "vivillon", "litleo", "pyroar", "flabebe", "floette", "florges", "skiddo", "gogoat", "pancham", "pangoro", "furfrou", "espurr", "meowstic", "honedge", "doublade", "aegislash", "spritzee", "aromatisse", "swirlix", "slurpuff", "inkay", "malamar", "binacle", "barbaracle", "skrelp", "dragalge", "clauncher", "clawitzer", "helioptile", "heliolisk", "tyrunt", "tyrantrum", "amaura", "aurorus", "sylveon", "hawlucha", "dedenne", "carbink", "goomy", "sliggoo", "goodra", "klefki", "phantump", "trevenant", "pumpkaboo", "gourgeist", "bergmite", "avalugg", "noibat", "noivern", "xerneas", "yveltal", "zygarde", "diancie", "hoopa", "volcanion", "rowlet", "dartrix", "decidueye", "litten", "torracat", "inceneroar", "popplio", "brionne", "primarina", "pikipek", "trumbeak", "toucannon", "yungoos", "gumshoos", "grubbin", "charjabug", "vikavolt", "crabrawler", "crabominable", "oricorio", "cutiefly", "ribombee", "rockruff", "lycanroc", "wishiwashi", "mareanie", "toxapex", "mudbray", "mudsdale", "dewpider", "araquanid", "fomantis", "lurantis", "morelull", "shiinotic", "salandit", "salazzle", "stufful", "bewear", "bounsweet", "steenee", "tsareena", "comfey", "oranguru", "passimian", "wimpod", "golisopod", "sandygast", "palossand", "pyukumuku", "type null", "silvally", "minior", "komala", "turtonator", "togedemaru", "mimikyu", "bruxish", "drampa", "dhelmise", "jangmo-o", "hakamo-o", "kommo-o", "tapu koko", "tapu lele", "tapu bulu", "tapu lele", "cosmog", "cosmoem", "solgaleo", "lunala", "nihilego", "buzzwole", "pheromosa", "xurkitree", "celesteela", "kartana", "guzzlord", "necrozma", "magearna", "marshadow", "poipole", "naganadel", "stakataka", "blacephalon", "zeraora", "meltan", "melmetal", "grookey", "thwackey", "rillaboom", "scorbunny", "raboot", "cinderace", "sobble", "drizzile", "inteleon", "skwovet", "greedent", "rookidee", "corvisquire", "corviknight", "blipbug", "dottler", "orbeetle", "nickit", "thievul", "gossifleur", "elddegoss", "wooloo", "dubwool", "chewtle", "drednaw", "yamper", "boltund", "rolycoly", "carkol", "coalossal", "applin", "flapple", "appletun", "sillicobra", "sandaconda", "cramorant", "arrokuda", "barraskewda", "toxel", "toxtricity", "sizzlipede", "centiscorch", "clobbopus", "grapploct", "sinistea", "polteageist", "hatenna", "hattrem", "hatterene", "impidimp", "morgrem", "grimmsnarl", "obstagoon", "perrserker", "cursola", "sirfetchd", "mr rime", "runerigus", "milcery", "alcremie", "falinks", "pincurchin", "snom", "frosmoth", "stonjourner", "eiscue", "indeedee", "morpeko", "cufant", "copperajah", "dracozolt", "arctozolt", "dracovish", "arctovish", "duraludon", "dreepy", "drakloak", "dragapult", "zacian", "zamazenta", "eternatus", "kubfu", "urshifu", "zarude", "regieleki", "regidrago", "glastrier", "spectrier", "calyrex", "wyrdeer", "kleavor", "ursaluna", "basculegion", "sneasler", "overqwil", "enamorus"];

/**@type {{[k: string]: Command | string}} */
let commands = {
	// Developer commands
	js: 'eval',
	eval: function (target, room, user) {
		if (!user.isDeveloper()) return;
		try {
			target = eval(target);
			this.say(JSON.stringify(target));
		} catch (e) {
			this.say(e.name + ": " + e.message);
		}
	},

	// General commands
    
    about: function (target, room, user) {
		if (room instanceof Users.User) {
		return this.say("Hi, i'm " + Config.username + "! I'm a bot. My command character is ``#``. For help, pm user pichuhat. I am based off of sirDonovan's bot system, Cassius. you can see it here: https://github.com/sirDonovan/Cassius");
        } else {
        if (user.isDeveloper()) {
        return this.say("Hi, i'm " + Config.username + "! I'm a bot. My command character is ``#``. For help, pm user pichuhat. I am based off of sirDonovan's bot system, Cassius. you can see it here: https://github.com/sirDonovan/Cassius") 
         } else {
         return this.say('/msg ' + Users.User + ", Hi, I'm s ~ usb ~ ot! I'm a bot. My command character is ``#``. If you need help from moderators, contact them instead. Note that users with a * before their name are bots.")
         }
       }
    },
    
    
	help: function (target, room, user) {
		if (room instanceof Users.User) return;
        if (!user.isDeveloper() && !user.isSubDeveloper()) return;
		return this.say("need a guide? one is available here!https://github.com/sirDonovan/Cassius");
	},
	mail: function (target, room, user) {
        if (Config.allowMail) {
        console.log("target: " + target)
		if (!(room instanceof Users.User)) return;
		let targets = target.split(',');
		if (targets.length < 2) return this.say("Please use the following format: .mail user, message");
		let to = Tools.toId(targets[0]);
		if (!to || to.length > 18 || to === Users.self.id || to.startsWith('guest')) return this.say("Please enter a valid username");
		let message = targets.slice(1).join(',').trim();
		let id = Tools.toId(message);
		if (!id) return this.say("Please include a message to send.");
		if (message.length > (258 - user.name.length)) return this.say("Your message is too long.");
		let database = Storage.getDatabase('global');
		if (to in database.mail) {
			let queued = 0;
			for (let i = 0, len = database.mail[to].length; i < len; i++) {
				if (Tools.toId(database.mail[to][i].from) === user.id) queued++;
			}
			if (queued >= 3) return this.say("You have too many messages queued for " + Users.add(targets[0]).name + ".");
		} else {
			database.mail[to] = [];
		}
		database.mail[to].push({time: Date.now(), from: user.name, text: message});
		Storage.exportDatabase('global');
		this.say("Your message has been sent to " + Users.add(targets[0]).name + "!");
        } else {
        return this.say("Buddy you know you can just use a different bot.. My mail is kinda broken rn..")
        }
	},
    
        botrepo: function (target, room, user) {
        if (room instanceof Users.User) {
        return this.say("Susbot's repository: https://github.com/pichuhat/susbot-pscode")
        } else {
        if (!user.isDeveloper && !user.hasRank(room, "+") && !user.isSubDeveloper) return;
        return this.say("Susbot's repository: https://github.com/pichuhat/susbot-pscode")
        }
        },
    
        potato: function (target, room, user) {
		if (room instanceof Users.User) {
		return this.say("no, its pot - AH - to");
        } else {
        if (!user.isDeveloper() && !user.hasRank(room, "+") && !user.isSubDeveloper) return;
        return this.say("no, its pot - AH - to")  
       }
        },
    
        sausage: function (target, room, user) {
		if (room instanceof Users.User) {
		return this.say("no, its sauce - age");
        } else {
        if (!user.isDeveloper() && !user.hasRank(room, "+") && !user.isSubDeveloper()) return;
        return this.say("no, its sauce - age")
       }
       },
    
        say: function (target, room, user) {
        if (!user.isDeveloper()) return;
        return this.say(target)
        },
 

        joinroom: function (target, room, user) {
        if (!user.isDeveloper()) return;
        this.say('/join ' + target)
        return this.say('Successfully joined room: ' + target)
        },
    
        dextopokemon: function (target, room, user) {
        if (room instanceof Users.User) return;
        if (!user.isDeveloper() && !user.hasRank(room, "+") && !user.isSubDeveloper()) return;
        if (target < 906) {
        let pokedex = target - 1
        return this.say(fullpokes[pokedex])
        } else {
        return this.say("invalid pokemon")
        }
        },
    
        dt: function (target, room, user) {
        if (room instanceof Users.User) {
        return this.say("I am not a global bot, so I cannot use this command.")
        } else {
        if (!room.name == "idm") {
        if (!user.isDeveloper && !user.hasRank(room, "+") && !user.isSubDeveloper) return;
        return this.say("I need room voice or higher in this room so I can use this command.")
        } else {
        if (!user.isDeveloper && !user.hasRank(room, "+") && !user.isSubDeveloper) return;
        return this.say("!dt " + target)
        }
        }
        },
    
        developers: function (target, room, user) {
          if (room instanceof Users.User) {
          this.say("Current developers: " + Config.developers)
          return this.say("Current Sub-Developers: " + Config.subdevelopers)
          } else {
          if (!user.isDeveloper() && !user.isSubDeveloper()) return;
          this.say("Current Developers: " + Config.developers)
          return this.say("Current Sub-Developers: " + Config.subdevelopers)
          }
        },
            
        
    
        sus: function (target, room, user) {
        if (room instanceof Users.User) {
        return this.say("in pm's ur never sus")    
         } else {
        if (user.hasRank(room, "#")) {
        return this.say("I didn't know someone could be that sus. sus rank: 10/10");
          } else {
        if (user.hasRank(room, "@")) {
        return this.say("Woah, pretty sus there. sus rank: 8/10");   
          } else {
        if (user.hasRank(room, "%")) {
        return this.say("Quite sus, but maybe someone is framing you. sus rank: 6/10");
           } else {
        if (user.hasRank(room, "+")) {
        return this.say("Not that sus, someone said that on shoddy evidence. sus rank: 3/10")   
            } else {
        return this.say("/msg " + user.name + ", good crewmate! **sus rank: 0/10**")    
            }
           }
          }
         }
        }
       },
    
        pikachu: function (target, room, user) {
        if (room instanceof Users.User) {
        return this.say("pikachu is the evolved form of pichu, and pikachu evolves into raichu.");   
         } else {
        if (!user.hasRank(room, "+") || !user.isDeveloper() && user.isSubDeveloper()) return;
        return this.say("pikachu is the evolved form of pichu, and pikachu evolves into raichu.")
         }
        },
    
        //selfreminder: [1,2,3,4].indexOf 
    
        getdex: function (target, room, user) {
        if (fullpokes.includes(target)) {
        if (room instanceof Users.User) {
        let pokenumber = fullpokes.indexOf(target) + 1
        return this.say(target + " has a dex number of " + pokenumber + ".")
        } else {
        if (!user.isDeveloper && !user.hasRank(room, "+") && !user.isSubDeveloper()) return;
        let pokenumber = fullpokes.indexOf(target) + 1
        return this.say(target + " has a dex number of " + pokenumber + ".")
         }
        } else {
        if (room instanceof Users.User) {
        return this.say("invalid pokemon.")
         } else {
        return this.pm(user.name, "invalid pokemon.") 
         }
        }
       },
    

        starthunt: function (target, room, user) {
        if (!room instanceof Users.User) return;
        return this.say('Thank you for submitting your hunt. However, I am only a bot. Ask another staff member about your hunt.')
        },
    
        seen: function (target, room, user) {
        if (!room instanceof Users.User) return;
        if (target = "susbot") {
        return this.say("Apparently, you seem to be either blind or illiterate. You might want to get that checked out.")
        }
        },
    
        zip: function (target, room, user) {
        if (!room instanceof Users.User) return;
        return this.say("Zipzapadam: Quality hunts since 1969.")
        },
    
        log: function (target, room, user) {
        if (!target.endsWith("wants to battle!")) return;
        this.say("trying to get susbot's battle code...")
        this.say("/reject")
        return this.say("could not reach susbot's battle code. Err: require-battlecode.js-did-not-connect");
        },
  
        piglatin: function(target, room, user) {
        if (room instanceof Users.User) {
        var pigword = target;
        pigword = pigword + pigword.charAt(0)
        pigword = pigword.slice(1)
        pigword = pigword + "ay"
        return this.say(pigword)
        } else {
        if (!user.isDeveloper() && !user.hasRank(room, '+') && user.isSubDeveloper) return;
        var pigword = target;
        pigword = pigword + pigword.charAt(0)
        pigword = pigword.slice(1)
        pigword = pigword + "ay"
        return this.say(pigword)
        }
        },

        geometrydash: function (target, room, user) {
        if (room instanceof Users.User) {
        return this.say("among us is worse");
         } else {
        if (!user.isDeveloper && !user.hasRank(room, '+') && !user.isSubDeveloper()) return;
        return this.say("among us is worse")
         }
        },
    
        amongus: function (target, room, user) {
        if (room instanceof Users.User) {
        return this.say("geometry dash is better");
         } else {
        if (!user.isDeveloper && !user.hasRank(room, '+') && !user.isSubDeveloper()) return;
        return this.say("geometry dash is better")
         }
        },
    
        randomnumber: 'dice',
        rolldice: 'dice',
        dice: function (target, room, user) {
        if (room instanceof Users.User) {
        let num = JSON.stringify(target) + 1
        num = num / 10
        if (isNaN(num)) {
        return this.say("Invalid. Try again.")
        } else {
        let response = Math.floor(Math.random() * num);
        return this.say(response)
        }
        } else {
        if (!user.isDeveloper() && !user.hasRank(room, "+") && !user.isSubDeveloper()) return;
        let num = target + 1
        num = num / 10
        if (isNaN(num)) {
        return this.say("Invalid. Try again.")
        } else {
        let response = Math.floor(Math.random() * num);
        return this.say(response)
        }
        }
        },
    
       randpoke: function (target, room, user) {
       if (room instanceof Users.User) {
       let pokenum = Math.floor(Math.random() * 906) + 1
       let gitpoke = fullpokes[pokenum]
       return this.say("!dt " + gitpoke)
       } else {
       if (user.isDeveloper() || user.isSubDeveloper() || user.hasRank(room, "+")) {
              let pokenum = Math.floor(Math.random() * 906) + 1
       let gitpoke = fullpokes[pokenum]
       return this.say(gitpoke)
       } else {
       let pokenum = Math.floor(Math.random() * 906) + 1
       let gitpoke = fullpokes[pokenum]
       return this.pm(user.name, "!dt " + gitpoke)
       }
       }
       },
    
       flame: function (target, room, user) {
       if (room instanceof Users.User) {
       this.say('.vote ddz, solo')
       return this.say('.select giratina-origin')
       } else {
       if (!user.isDeveloper && !user.isSubDeveloper && !user.hasRank(room, "+")) return;
       this.say('.vote ddz, solo')
       return this.say('.select giratina-origin')
       }
       },

       schoolrules: 'scolipedes',
       schoolrulebreakers: 'scolipedes',
       ssr: 'scolipedes',
       scolipedes: function (target, room, user) {
       if (!user.isDeveloper && !user.hasRank(room, "%")) return;
       if (room instanceof Users.User) return;
       if (activegame == false) {
       return this.say("A game of Scolipedes School Rulebreakers was started by " + user.name + "! type ``#joinscols`` to play!")
       gameroom = room.id;
       activegame = true;
       } else {
       return this.say("A game in " + gameroom + " is already active.")
       }
       },
    
       joinscols: function (target, room, user) {
       if (!gamepllist.includes(user.name)) {
       gamepllist.push(user.name)
       return this.pm(user.name, "You have joined the game of Scolipede's School RuleBreakers!")
       } else {
       return this.pm(user.name, "You have already joined the game.")
       }
       },
    
       scolspl: function (target, room, user) {
       if (!user.isDeveloper() && !user.isSubDeveloper() && !user.hasRank(room, "+")) return;
       return this.say("Game player list: " + gamepllist);
       },
    
       endscols: function (target, room, user) {
       if (!user.isDeveloper() && !user.isSubDeveloper() && !user.hasRank(room, "%")) return;
       gamepllist = [];
       gameroom = "";
       activegame = false;
       gameon = false;
       return this.say("The Game of Scolipede's School Rulebreakers was forcibly ended!");
       },
    
       startscols: function (target, room, user) {
       if (!user.isDeveloper() && !user.isSubDeveloper() && !user.hasRank(room, "%")) return;
       if (activegame == true) {
       if (gamepllist.length > 1) {
       this.say("The game of Scolipedes School Rulebreakers was started!")
       playerturn = gamepllist[playerturngitnum]
       gameon = true
       return this.say(playerturn + "it is your turn to go!")
       } else {
       return this.say("This game cannot be played with less than 2 players.")
       }
       } else {
       return this.say("There is no active game.")
       }
       },
    
      run: function (target, room, user) {
      if (gameon == true && playerturn == user.name && !room instanceof Users.User) {
      return this.say("GameTest Complete. End game.")
      } else {
      return this.pm(user.name, "It is not your turn to play.")
      }
      },
    
	// Game commands
	signups: 'creategame',
	creategame: function (target, room, user) {
		if (room instanceof Users.User) return;
		if (!user.hasRank(room, '+')) return;
		if (!Config.games || !Config.games.includes(room.id)) return this.say("Games are not enabled for this room.");
		let format = Games.getFormat(target);
		if (!format || format.inheritOnly) return this.say("The game '" + target + "' was not found.");
		if (format.internal) return this.say(format.name + " cannot be started manually.");
		Games.createGame(format, room);
		if (!room.game) return;
		room.game.signups();
	},
	start: 'startgame',
	startgame: function (target, room, user) {
		if (!(room instanceof Users.User) && !user.hasRank(room, '!')) return;
		if (room.game) room.game.start();
	},
	cap: 'capgame',
	capgame: function (target, room, user) {
		if (room instanceof Users.User || !room.game || !user.hasRank(room, '!')) return;
		let cap = parseInt(target);
		if (isNaN(cap)) return this.say("Please enter a valid player cap.");
		if (cap < room.game.minPlayers) return this.say(room.game.name + " must have at least " + room.game.minPlayers + " players.");
		if (room.game.maxPlayers && cap > room.game.maxPlayers) return this.say(room.game.name + " cannot have more than " + room.game.maxPlayers + " players.");
		room.game.playerCap = cap;
		this.say("The game will automatically start at **" + cap + "** players!");
	},
	end: 'endgame',
	endgame: function (target, room, user) {
		if (!(room instanceof Users.User) && !user.hasRank(room, '!')) return;
		if (room.game) room.game.forceEnd();
	},
	join: 'joingame',
	joingame: function (target, room, user) {
		if (room instanceof Users.User || !room.game) return;
		room.game.join(user);
	},
	leave: 'leavegame',
	leavegame: function (target, room, user) {
		if (room instanceof Users.User || !room.game) return;
		room.game.leave(user);
	},
	// Storage commands
    //none!
	// Tournament commands
	tour: 'tournament',
	tournament: function (target, room, user) {
		if (room instanceof Users.User || !Config.tournaments || !Config.tournaments.includes(room.id)) return;
		if (!target) {
			if (!user.hasRank(room, '+')) return;
			if (!room.tour) return this.say("I am not currently tracking a tournament in this room.");
			let info = "``" + room.tour.name + " tournament info``";
			if (room.tour.startTime) {
				return this.say(info + ": **Time**: " + Tools.toDurationString(Date.now() - room.tour.startTime) + " | **Remaining players**: " + room.tour.getRemainingPlayerCount() + '/' + room.tour.totalPlayers);
			} else if (room.tour.started) {
				return this.say(info + ": **Remaining players**: " + room.tour.getRemainingPlayerCount() + '/' + room.tour.totalPlayers);
			} else {
				return this.say(info + ": " + room.tour.playerCount + " player" + (room.tour.playerCount > 1 ? "s" : ""));
			}
		} else {
			if (!user.hasRank(room, '%')) return;
			let targets = target.split(',');
			let cmd = Tools.toId(targets[0]);
			let format;
			switch (cmd) {
			case 'end':
				this.say("/tour end");
				break;
			case 'start':
				this.say("/tour start");
				break;
			default:
				format = Tools.getFormat(cmd);
				if (!format) return this.say('**Error:** invalid format.');
				if (!format.playable) return this.say(format.name + " cannot be played, please choose another format.");
				let cap;
				if (targets[1]) {
					cap = parseInt(Tools.toId(targets[1]));
					if (cap < 2 || cap > Tournaments.maxCap || isNaN(cap)) return this.say("**Error:** invalid participant cap.");
				}
				this.say("/tour new " + format.id + ", elimination, " + (cap ? cap + ", " : "") + (targets.length > 2 ? ", " + targets.slice(2).join(", ") : ""));
			}
		}
	},
	settour: 'settournament',
	settournament: function (target, room, user) {
		if (room instanceof Users.User || !Config.tournaments || !Config.tournaments.includes(room.id) || !user.hasRank(room, '%')) return;
		if (room.id in Tournaments.tournamentTimers) {
			let warned = overwriteWarnings.has(room.id) && overwriteWarnings.get(room.id) === user.id;
			if (!warned) {
				overwriteWarnings.set(room.id, user.id);
				return this.say("A tournament has already been scheduled in this room. To overwrite it, please reuse this command.");
			}
			overwriteWarnings.delete(room.id);
		}
		let targets = target.split(',');
		if (targets.length < 2) return this.say(Config.commandCharacter + "settour - tier, time, cap (optional)");
		let format = Tools.getFormat(targets[0]);
		if (!format) return this.say('**Error:** invalid format.');
		if (!format.playable) return this.say(format.name + " cannot be played, please choose another format.");
		let date = new Date();
		let currentTime = (date.getHours() * 60 * 60 * 1000) + (date.getMinutes() * (60 * 1000)) + (date.getSeconds() * 1000) + date.getMilliseconds();
		let targetTime = 0;
		if (targets[1].includes(':')) {
			let parts = targets[1].split(':');
			let hours = parseInt(parts[0]);
			let minutes = parseInt(parts[1]);
			if (isNaN(hours) || isNaN(minutes)) return this.say("Please enter a valid time.");
			targetTime = (hours * 60 * 60 * 1000) + (minutes * (60 * 1000));
		} else {
			let hours = parseFloat(targets[1]);
			if (isNaN(hours)) return this.say("Please enter a valid time.");
			targetTime = currentTime + (hours * 60 * 60 * 1000);
		}
		let timer = targetTime - currentTime;
		if (timer <= 0) timer += 24 * 60 * 60 * 1000;
		Tournaments.setTournamentTimer(room, timer, format.id, targets[2] ? parseInt(targets[2]) : 0);
		this.say("The " + format.name + " tournament is scheduled for " + Tools.toDurationString(timer) + ".");
	},
	canceltour: 'canceltournament',
	canceltournament: function (target, room, user) {
		if (room instanceof Users.User || !Config.tournaments || !Config.tournaments.includes(room.id) || !user.hasRank(room, '%')) return;
		if (!(room.id in Tournaments.tournamentTimers)) return this.say("There is no tournament scheduled for this room.");
		clearTimeout(Tournaments.tournamentTimers[room.id]);
		this.say("The scheduled tournament was canceled.");
	},
};

module.exports = commands;