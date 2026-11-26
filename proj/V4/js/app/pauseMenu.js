define( ["three","variable","meshPlayer","camera","scene","textPRESSENTERTORESETGAME","textPAUSED"],
    function (THREE, variable, meshPlayer, camera, scene, textPRESSENTERTORESETGAME, textPAUSED) {

        // Cube semi-transparent créé une seule fois (avant : un nouveau cube à chaque image
        // pendant le Game Over, jamais supprimé de la scène -> fuite mémoire).
        var menu = new THREE.Mesh(
            new THREE.BoxGeometry(15, 15, 15),
            new THREE.MeshPhongMaterial({color: 0x000000, wireframe: variable.USE_WIREFRAME, transparent: true, opacity: 0.5})
        );
        menu.receiveShadow = true;
        menu.castShadow = true;

        function pauseMenu(on) {
            if (on === 1) {
                var origin = variable.alive === 1 ? variable.lastPosition : meshPlayer.position;
                menu.position.set(origin.x - 4, origin.y + 4, origin.z - 4);
                menu.quaternion.copy(camera.quaternion);

                var demo = document.getElementById("demo");
                if (variable.start == 0) {
                    demo.style.display = "block";
                    variable.start = 1;
                } else {
                    demo.style.display = "none";
                }

                if (!menu.parent) scene.add(menu);

                if (variable.alive === 1) {
                    textPRESSENTERTORESETGAME(1);
                } else {
                    textPAUSED(1);
                }
            } else {
                textPRESSENTERTORESETGAME(0);
                textPAUSED(0);
                if (menu.parent) scene.remove(menu);
            }
        }

        return pauseMenu;
    } );
