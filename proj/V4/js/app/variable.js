define( [], function () {
    var  variable ={
        USE_WIREFRAME : false,
        paused : 1,
        alive: 0,
        lastPosition :0 ,
        gameReset : 0,
        keyboard : {},
        pressed: 0,
        playerScore : 0,
        player :{ height:1.8, speed:1, turnSpeed:Math.PI*0.02, direction:0, downSpeed:0.0001 },
stack:{},
        playerdiff: {debutant:"debutant",intermediaire:"intermediaire", difficile:"difficile"},
    };
    return variable;
} );