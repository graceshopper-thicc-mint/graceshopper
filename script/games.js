const games = [
  {
    name: "Totally Accurate Battlegrounds",
    price: 0,
    genre: "Indie",
    maturityRating: "E",
    publisher: "Landfall",
    imageUrl:
      "https://cdn.akamai.steamstatic.com/steam/apps/823130/header.jpg?t=1620818743",
    platform: "PC",
    description:
      "Battle Royal like you've never seen it before. Start the match skydiving face-first into a building and end the game by beating your opponents in a guns-blazing game of the floor is lava.",
    releaseDate: "2018-06-05",
  },

  {
    name: "Grounded",
    price: 29.99,
    genre: "Survival",
    maturityRating: "E",
    publisher: "Xbox Game Studios",
    imageUrl:
      "https://cdn.akamai.steamstatic.com/steam/apps/962130/header.jpg?t=1627580479",
    platform: "PC, Xbox",
    description:
      "The world is a vast, beautiful and dangerous place – especially when you have been shrunk to the size of an ant. Explore, build and survive together in this first person, multiplayer, survival-adventure. Can you thrive alongside the hordes of giant insects, fighting to survive the perils of the backyard?",
    releaseDate: "2020-07-28",
  },

  {
    name: "Hades",
    price: 24.99,
    genre: "Roguelike",
    maturityRating: "E",
    publisher: "Supergiant Games",
    imageUrl:
      "https://cdn.akamai.steamstatic.com/steam/apps/1145360/header.jpg?t=1624463563",
    platform: "PC, PS4, PS5, Xbox",
    description:
      "Hades is a god-like rogue-like dungeon crawler that combines the best aspects of Supergiant's critically acclaimed titles, including the fast-paced action of Bastion, the rich atmosphere and depth of Transistor, and the character-driven storytelling of Pyre.",
    releaseDate: "2020-09-17",
  },

  {
    name: "The Outer Worlds",
    price: 59.99,
    genre: "Action, RPG",
    maturityRating: "M",
    publisher: "Private Division",
    imageUrl:
      "https://cdn.akamai.steamstatic.com/steam/apps/578650/header.jpg?t=1616004214",
    platform: "PS4, Xbox, Nintendo Switch, PC",
    description:
      "Lost in transit while on a colonist ship bound for the furthest edge of the galaxy, you awake decades later only to find yourself in the midst of a deep conspiracy threatening to destroy the Halcyon colony. As you explore the furthest reaches of space and encounter various factions, all vying for power, the character you decide to become will determine how this player-driven story unfolds. In the corporate equation for the colony, you are the unplanned variable.",
    releaseDate: "2020-10-23",
  },

  {
    name: "It Takes Two",
    price: 39.99,
    genre: "Co-op, Adventure",
    maturityRating: "E",
    publisher: "Electronic Arts",
    imageUrl:
      "https://cdn.akamai.steamstatic.com/steam/apps/1426210/header_alt_assets_0.jpg?t=1627656469",
    platform: "PC, PS4, PS5, Xbox",
    description:
      "Embark on the craziest journey of your life in It Takes Two, a genre-bending platform adventure created purely for co-op. Invite a friend to join for free with Friend’s Pass and work together across a huge variety of gleefully disruptive gameplay challenges. Play as the clashing couple Cody and May, two humans turned into dolls by a magic spell. Together, trapped in a fantastical world where the unpredictable hides around every corner, they are reluctantly challenged with saving their fractured relationship.",
    releaseDate: "2021-03-26",
  },

  {
    name: "Spyro: Reignited Trilogy",
    price: 33.49,
    genre: "Adventure",
    maturityRating: "E",
    publisher: "Activision",
    imageUrl:
      "https://assets.nintendo.com/image/upload/c_pad,f_auto,h_490,q_auto,w_360/ncom/en_US/games/switch/s/spyro-reignited-trilogy-switch/description-image?v=2021080216",
    platform: "PS4",
    description:
      "The original roast master is back, and he’s on-the-go! Same sick burns, same smoldering attitude, now all scaled up in stunning HD. Spyro is bringing the heat like never before in the Spyro™ Reignited Trilogy game collection. Rekindle the fire with remastered versions of the original three games, Spyro™ the Dragon, Spyro™ 2: Ripto's Rage! and Spyro™: Year of the Dragon. Explore the expansive realms, re-encounter the fiery personalities and relive the adventure in fully remastered glory. Because when there’s a realm that needs saving, there’s only one dragon to call.",
    releaseDate: "2018-11-12",
  },

  {
    name: "Overcooked",
    description:
      "Overcooked is a chaotic couch co-op cooking game for one to four players. Working as a team, you and your fellow chefs must prepare, cook and serve up a variety of tasty orders before the baying customers storm out in a huff.",
    price: 16.99,
    imageUrl:
      "https://cdn.akamai.steamstatic.com/steam/apps/448510/capsule_616x353.jpg?t=1594197612",
    genre: "Indie, Action",
    publisher: "Team 17",
    releaseDate: "2016-08-02",
    maturityRating: "E",
  },

  {
    name: "Overcooked! 2",
    description:
      "Overcooked returns with a brand-new helping of chaotic cooking action! Journey back to the Onion Kingdom and assemble your team of chefs in classic couch co-op or online play for up to four players. Hold onto your aprons… it’s time to save the world again!",
    price: 24.99,
    imageUrl:
      "https://www.team17.com/wp-content/uploads/2020/08/Overcooked2-Desktop-Tile2.jpg",
    genre: "Indie, Action",
    releaseDate: "2018-08-07",
    publisher: "Team 17",
    maturityRating: "E",
  },

  {
    name: "Mario Kart 8 deluxe",
    description:
      "Hit the road with the definitive version of Mario Kart 8 and play anytime, anywhere! Race your friends or battle them in a revised battle mode on new and returning battle courses. Play locally in up to 4-player multiplayer in 1080p while playing in TV Mode. Every track from the Wii U version, including DLC, makes a glorious return. Plus, the Inklings appear as all-new guest characters, along with returning favorites, such as King Boo, Dry Bones, and Bowser Jr.!",
    price: 48.99,
    imageUrl:
      "https://images.nintendolife.com/802713810685c/mario-kart-8-deluxe-cover.cover_large.jpg",
    genre: "Sports, Racing",
    releaseDate: "2017-04-28",
    publisher: "Nintendo",
    maturityRating: "E",
  },

  {
    name: "Animal Crossing: New Horizons",
    description:
      "Escape to a deserted island and create your own paradise as you explore, create, and customize in the Animal Crossing: New Horizons game. Your island getaway has a wealth of natural resources that can be used to craft everything from tools to creature comforts. You can hunt down insects at the crack of dawn, decorate your paradise throughout the day, or enjoy sunset on the beach while fishing in the ocean. The time of day and season match real life, so each day on your island is a chance to check in and find new surprises all year round.",
    price: 59.99,
    imageUrl:
      "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/5723/5723316_sd.jpg",
    genre: "Social simulation",
    maturityRating: "E",
    publisher: "Nintendo",
    releaseDate: "2020-03-20",
  },

  {
    name: "Back 4 Blood",
    price: 59.99,
    genre: "First-person shooter, Survival, horror",
    maturityRating: "M",
    publisher: "Turtle Rock Studios",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/en/thumb/6/60/Back_4_Blood_cover_art.jpg/220px-Back_4_Blood_cover_art.jpg",
    platform: "PC, PS4, PS5, Xbox",
    description:
      "Back 4 Blood is a thrilling cooperative first-person shooter from the creators of the critically acclaimed Left 4 Dead franchise. You are at the center of a war against the Ridden. These once-human hosts of a deadly parasite have turned into terrifying creatures bent on devouring what remains of civilization. With humanity’s extinction on the line, it’s up to you and your friends to take the fight to the enemy, eradicate the Ridden, and reclaim the world.",
    releaseDate: "2021-10-12",
  },

  {
    name: "Enter the Gungeon",
    price: 14.99,
    genre: "Action, Adventure, Indie",
    maturityRating: "T",
    publisher: "Devolver Studios",
    imageUrl:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/311690/header.jpg?t=1622216602",
    platform: "PlayStation 4, Xbox One, Nintendo Switch, PC",
    description:
      "Enter the Gungeon is a bullet hell dungeon crawler following a band of misfits seeking to shoot, loot, dodge roll and table-flip their way to personal absolution by reaching the legendary Gungeon’s ultimate treasure: the gun that can kill the past.",
    releaseDate: "2016-04-05",
  },

  {
    name: "Guilty Gear Strive",
    price: 59.99,
    genre: "Action, Fighting",
    maturityRating: "T",
    publisher: "Arc System Works",
    imageUrl:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/1384160/header.jpg?t=1625015685",
    platform: "PlayStation 5, Playstation 4, Xbox One, PC",
    description:
      "The cutting-edge 2D/3D hybrid graphics pioneered in the Guilty Gear series have been raised to the next level in “GUILTY GEAR -STRIVE-“. The new artistic direction and improved character animations will go beyond anything you’ve seen before in a fighting game!",
    releaseDate: "2021-06-11",
  },

  {
    name: "DeadCells",
    price: 24.99,
    genre: "Action, Indie",
    maturityRating: "T",
    publisher: "Motion Twin",
    imageUrl:
      "https://image.api.playstation.com/cdn/EP3862/CUSA10484_00/M4qvvtKGTKLDSCCHH9obJjZHru43pNmo.png",
    platform: "PlayStation 4, Nintendo Switch, Xbox One, macOS, PC",
    description:
      "Dead Cells is a rogue-lite, metroidvania inspired, action-platformer. You'll explore a sprawling, ever-changing castle... assuming you’re able to fight your way past its keepers in 2D souls-lite combat. No checkpoints. Kill, die, learn, repeat.",
    releaseDate: "2018-08-06",
  },

  {
    name: "Okami",
    price: 19.99,
    genre: "Adventure",
    maturityRating: "T",
    publisher: "Capcom CO.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/en/b/be/OkamiNTSCcoverFinal.jpg",
    platform: "PlayStation 4, Nintendo Switch, Xbox One, PC",
    description:
      "Take on the role of Amaterasu, the Japanese sun goddess who inhabits the form of a legendary white wolf, on a quest to defeat Orochi, an eight-headed demon and tyrannical monster responsible for turning the world of Nippon into a ruined wasteland.",
    releaseDate: "2017-12-12",
  },

  {
    name: "Chernobylite",
    price: 29.99,
    genre:
      "RPG, Survival, Horror, Post-apocalyptic, Sci-fi, Action, Adventure, Indie, Simulation",
    maturityRating: "M",
    publisher: "The Farm 51",
    imageUrl:
      "https://cdn.akamai.steamstatic.com/steam/apps/1016800/header.jpg?t=1627905992",
    platform: "PC",
    description:
      "Chernobylite is a science-fiction survival horror RPG. Set in the hyper-realistic, 3D-scanned wasteland of Chernobyl’s Exclusion Zone, explore a non-linear storyline in your search to uncover the truth of your tortured past.",
    releaseDate: "2021-07-28",
  },

  {
    name: "Exodus Borealis",
    price: 14.99,
    genre: "Strategy, Building, Tower Defense, City Builder",
    maturityRating: "E",
    publisher: "Smug Marmot Studios",
    imageUrl:
      "https://cdn.akamai.steamstatic.com/steam/apps/1528810/header.jpg?t=1627061422",
    platform: "PC",
    description:
      "In this city builder and tower defense game, you will command a small band of ship wrecked colonists. Go from struggling to survive the elements to a thriving kingdom that will smash the demon hordes that dare attack your settlement.",
    releaseDate: "2012-06-22",
  },

  {
    name: "Ratchet & Clank: Rift Apart",
    price: 69.99,
    genre: "Action",
    maturityRating: "E",
    publisher: "Sony Interactive Entertainment",
    imageUrl:
      "https://image.api.playstation.com/vulcan/ap/rnd/202101/2921/DwVjpbKOsFOyPdNzmSTSWuxG.png",
    platform: "PS5",
    description:
      "BLAST YOUR WAY THROUGH AN INTERDIMENSIONAL ADVENTURE. Ratchet and Clank are back! Help them stop a robotic emperor intent on conquering cross-dimensional worlds, with their own universe next in the firing line. Witness the evolution of the dream team as they’re joined by Rivet – a Lombax resistance fighter from another dimension.",
    releaseDate: "2021-06-11",
  },

  {
    name: "SCARLET NEXUS",
    price: 59.99,
    genre: "Action, Adventure‬, Role playing, Anime",
    maturityRating: "T",
    publisher: "BANDAI NAMCO Entertainment America Inc.‬",
    imageUrl:
      "https://store-images.s-microsoft.com/image/apps.24095.13935484233947025.674cd2ac-314e-4c9b-83c6-887b562d193c.b6e0b620-0d3f-4e59-a5a7-25ceee6f72dd?mode=scale&q=90&h=720&w=1280&background=%23FFFFFF",
    platform: "Xbox Series X|S, Xbox One, PC",
    description:
      "In the far distant future, a psionic hormone was discovered in the human brain, granting people extra-sensory powers and changed the world as we knew it. As humanity entered this new era, deranged mutants known as Others began to descend from the sky with a hunger for human brains. Highly resistant to conventional attack methods, extreme measures needed to be taken to battle the overwhelming threat and preserve humanity. Those with acute extra-sensory abilities, known as psionics, were our only chance to fight the onslaught from above. Since then, psionics have been scouted for their talents and recruited to the Other Suppression Force (OSF), humanity’s last line of defense. Featuring a dual story, begin your adventure with either Yuito Sumeragi, an energetic recruit from a prestigious political family or Kasane Randall, the mysterious scout whose power and skill has gained great notoriety among the OSF. As their different experiences interweave with each other, it is only then that you will reveal the full story and unlock all the mysteries of a Brain Punk future caught between technology and psychic abilities in SCARLET NEXUS.",
    releaseDate: "2021-06-25",
  },

  {
    name: "Death's Door",
    price: 19.99,
    genre: "Action, Adventure‬, RPG, Action RPG, Indie",
    maturityRating: "E",
    publisher: "Devolver Digital‬",
    imageUrl:
      "https://cdn.akamai.steamstatic.com/steam/apps/894020/header.jpg?t=1627414742",
    platform: "PC",
    description:
      "Reaping souls of the dead and punching a clock might get monotonous but it's honest work for a Crow. The job gets lively when your assigned soul is stolen and you must track down a desperate thief to a realm untouched by death - where creatures grow far past their expiry and overflow with greed and power. Talon Sharp Combat: Utilize melee weapons, arrows and magic to overcome a fantastic array of beasts and demigods. Mistakes are punished and victory is rewarded. Gain an edge by customizing your character stats and mastering the abilities and upgrades you obtain. A Beautifully Bleak World: Venture beyond the Doors and explore a land full of twisted inhabitants and countless secrets, bringing hope to the weird and wonderful characters you’ll meet along the way. A Dark Mystery to Unravel: Track down and defeat colossal tyrants with stories and motivations of their own. Experience a somber yet darkly comedic tale, uncovering the truths behind the flow of souls, the role of the Crows and the origin of the Doors. ",
    releaseDate: "2021-07-20",
  },
];

module.exports = games;
