var StateLoad = {

    preload: function () {

        var empty = game.add.image(0, 0, "loadingEmpty");
        var full = game.add.image(0, 0, "loadingFull");

        center(empty);
        full.anchor.set(0, 0.5);
        full.x = game.world.centerX - empty.width / 2;
        full.y = empty.y;

        game.load.setPreloadSprite(full);

        //PRELOAD EVERYTHING HERE
        game.load.spritesheet("buttons", "images/ui/buttons-red.png", 265, 75);
        game.load.spritesheet("soundButtons", "images/ui/soundButtons-blue.png", 44, 44, 4);
        game.load.audio("backgroundMusic", "audio/background/piano.mp3");
        game.load.spritesheet("cards", "images/main/el_spritesheet.png", 250, 250, 10); //element 
        game.load.spritesheet("gameButtons", "images/main/rw_spritesheet.png", 300, 300, 10); //element cards


        //game.load.audio("elephant", "audio/sfx/elephant.mp3");
    },

    create: function () {
        game.state.start("StateTitle");
    },

    update: function () {
        
    }

}