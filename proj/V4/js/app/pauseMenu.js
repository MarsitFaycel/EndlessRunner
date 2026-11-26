// Voile semi-transparent devant la caméra en pause ou au Game Over,
// animation "Ready 3-2-1" avant le premier départ, message "rejouer" après une chute.
define( ["three", "variable", "meshPlayer", "camera", "scene", "gameOverMessage"],
    function ( THREE, variable, meshPlayer, camera, scene, gameOverMessage ) {

        var veil = new THREE.Mesh(
            new THREE.BoxGeometry(15, 15, 15),
            new THREE.MeshPhongMaterial({color: 0x000000, wireframe: variable.USE_WIREFRAME, transparent: true, opacity: 0.5})
        );
        var intro = document.getElementById("demo");
        var introPlayed = false;

        function setIntroVisible(visible) {
            if (intro) intro.style.display = visible ? "block" : "none";
        }

        function pauseMenu(on) {
            if (on === 1) {
                var origin = variable.alive === 1 ? variable.lastPosition : meshPlayer.position;
                veil.position.set(origin.x - 4, origin.y + 4, origin.z - 4);
                veil.quaternion.copy(camera.quaternion);
                if (!veil.parent) scene.add(veil);

                // L'animation d'intro n'est jouée qu'une fois, pendant l'attente du premier départ.
                if (!introPlayed && variable.alive === 0) {
                    introPlayed = true;
                    setIntroVisible(true);
                }
                gameOverMessage(variable.alive === 1);
            } else {
                if (veil.parent) {
                    scene.remove(veil);
                    gameOverMessage(false);
                    setIntroVisible(false);
                    if (variable.instructions) variable.instructions.textContent = "";
                }
            }
        }

        return pauseMenu;
    } );
