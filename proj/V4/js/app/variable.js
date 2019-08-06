define( [], function () {

    return {
        USE_WIREFRAME : false,
        paused : 1,
        alive: 0,
        lastPosition : null ,
        gameReset : 0,
        keyboard : {},
        pressed: 0,
        pressEnterToReset: null,
        playerScore : 0,
        player :{ height:1.8, speed:1, turnSpeed:Math.PI*0.02, direction:0, downSpeed:0.0001 },
        playerdiff: {debutant:"debutant",intermediaire:"intermediaire", difficile:"difficile"},
        timeDead :0,
        instructions : document.getElementById('instructions'),
        jeux: document.getElementById('Jeux'),
        Facile: document.getElementById('Facile'),
        Difficile: document.getElementById('Difficile'),
        Intermediaire: document.getElementById('Intermediaire'),
        start:0, // start on  = 0, start off =1;
        count : 4,
        levelCircle :document.getElementById("levelCircleStroke"),
    };
} );