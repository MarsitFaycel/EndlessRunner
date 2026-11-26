// Applique un virage demandé (Espace ou tap) : la bille alterne entre +x et +z.
define( ["variable"], function ( variable ) {

    function controls() {
        if (variable.pressed == 1 && variable.alive == 0) {
            variable.player.direction = variable.player.direction == 0 ? 1 : 0;
            variable.pressed = 2;
        }
    }

    return controls;
});
