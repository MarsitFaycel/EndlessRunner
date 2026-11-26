define(["three","meshPlayer","stack","variable","camera","world"] , function(THREE, meshPlayer, stack, variable, camera, world){

    var HIT_HALF_SIZE = 5.7;   // demi-taille d'un bloc + petite tolérance

    function checkBlockHit() {
        if (variable.alive !== 0) return;   // déjà mort : rien à vérifier

        var p = meshPlayer.position;
        var onGround = world.isOnStartZone(p);

        for (var i = 0; i < stack.length; i++) {
            var b = stack[i].position;
            if (Math.abs(p.x - b.x) <= HIT_HALF_SIZE && Math.abs(p.z - b.z) <= HIT_HALF_SIZE) {
                if (stack[i].hit === 0) {
                    variable.playerScore++;
                    stack[i].hit = 1;
                }
                onGround = true;
            }
        }

        if (!onGround) {
            if (variable.lastPosition == null) {
                meshPlayer.remove(camera);
                variable.lastPosition = p.clone();
            }
            variable.alive = 1;
        }
    }
    return checkBlockHit;
});
