define( ["variable","meshPlayer","light"], function ( variable,meshPlayer,light ) {
var updatePlayer = {

    updatePlayer: function() {

        if ((variable.player.direction) == 0)
        meshPlayer.position.x += variable.player.speed * 0.5;
    else
        meshPlayer.position.z += variable.player.speed * 0.5;
    if (variable.alive == 0) {
        light.position.x = meshPlayer.position.x - 20;
        light.position.z = meshPlayer.position.z + 20;
    }


    variable.player.speed += 0.0001;

}}

    return updatePlayer;

} );

